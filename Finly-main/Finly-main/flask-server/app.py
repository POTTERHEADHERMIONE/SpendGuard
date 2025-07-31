"""
Flask OCR Service
Handles receipt processing using Tesseract OCR
"""

import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge
import tempfile
import shutil

from ocr_service import OCRProcessor

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure CORS
CORS(app, origins=['http://localhost:3000', 'http://localhost:5000'])

# Configuration
app.config['MAX_CONTENT_LENGTH'] = int(os.getenv('MAX_CONTENT_LENGTH', 10 * 1024 * 1024))  # 10MB
app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER', 'uploads')

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize OCR processor
ocr_processor = OCRProcessor()

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf'}

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.errorhandler(RequestEntityTooLarge)
def handle_file_too_large(error):
    """Handle file size too large error"""
    return jsonify({
        'success': False,
        'message': 'File size too large. Maximum size is 10MB.'
    }), 413

@app.errorhandler(500)
def handle_internal_error(error):
    """Handle internal server errors"""
    logger.error(f"Internal server error: {str(error)}")
    return jsonify({
        'success': False,
        'message': 'Internal server error occurred'
    }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'success': True,
        'message': 'OCR service is running',
        'service': 'Flask OCR Service',
        'version': '1.0.0'
    })

@app.route('/process-receipt', methods=['POST'])
def process_receipt():
    """
    Process uploaded receipt file and extract information
    """
    try:
        # Check if file is in request
        if 'file' not in request.files:
            return jsonify({
                'success': False,
                'message': 'No file provided'
            }), 400
        
        file = request.files['file']
        
        # Check if file is selected
        if file.filename == '':
            return jsonify({
                'success': False,
                'message': 'No file selected'
            }), 400
        
        # Check file extension
        if not allowed_file(file.filename):
            return jsonify({
                'success': False,
                'message': 'Invalid file type. Allowed types: PNG, JPG, JPEG, PDF'
            }), 400
        
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, 
                                       suffix=os.path.splitext(file.filename)[1]) as temp_file:
            file.save(temp_file.name)
            temp_filepath = temp_file.name
        
        try:
            # Process the file
            result = ocr_processor.process_receipt(temp_filepath)
            
            logger.info(f"Successfully processed receipt: {file.filename}")
            
            return jsonify({
                'success': True,
                'message': 'Receipt processed successfully',
                'data': result
            })
            
        except Exception as e:
            logger.error(f"Error processing receipt {file.filename}: {str(e)}")
            return jsonify({
                'success': False,
                'message': f'Error processing receipt: {str(e)}'
            }), 500
            
        finally:
            # Clean up temporary file
            if os.path.exists(temp_filepath):
                os.unlink(temp_filepath)
    
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An unexpected error occurred'
        }), 500

@app.route('/process-text', methods=['POST'])
def process_text():
    """
    Process plain text and extract financial information
    """
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({
                'success': False,
                'message': 'Text content is required'
            }), 400
        
        text = data['text']
        
        if not text.strip():
            return jsonify({
                'success': False,
                'message': 'Text content cannot be empty'
            }), 400
        
        # Extract information from text
        result = ocr_processor.extract_from_text(text)
        
        return jsonify({
            'success': True,
            'message': 'Text processed successfully',
            'data': result
        })
        
    except Exception as e:
        logger.error(f"Error processing text: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Error processing text: {str(e)}'
        }), 500

@app.route('/supported-formats', methods=['GET'])
def get_supported_formats():
    """
    Get list of supported file formats and limits
    """
    return jsonify({
        'success': True,
        'data': {
            'supportedFormats': list(ALLOWED_EXTENSIONS),
            'maxFileSize': app.config['MAX_CONTENT_LENGTH'],
            'maxFileSizeMB': app.config['MAX_CONTENT_LENGTH'] / (1024 * 1024),
            'features': [
                'Text extraction from images (PNG, JPG, JPEG)',
                'PDF text extraction',
                'Amount detection',
                'Date recognition',
                'Merchant name identification',
                'Receipt structure analysis'
            ]
        }
    })

@app.route('/test-ocr', methods=['GET'])
def test_ocr():
    """
    Test OCR functionality
    """
    try:
        # Test basic OCR functionality
        test_result = ocr_processor.test_ocr_engine()
        
        return jsonify({
            'success': True,
            'message': 'OCR engine test completed',
            'data': test_result
        })
        
    except Exception as e:
        logger.error(f"OCR test failed: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'OCR test failed: {str(e)}'
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5001))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    logger.info(f"Starting Flask OCR Service on port {port}")
    logger.info(f"Debug mode: {debug}")
    logger.info(f"Upload folder: {app.config['UPLOAD_FOLDER']}")
    logger.info(f"Max file size: {app.config['MAX_CONTENT_LENGTH'] / (1024 * 1024):.1f}MB")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )