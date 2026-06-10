import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(os.path.dirname(BASE_DIR), 'frontend')

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL',
    f'sqlite:///{os.path.join(BASE_DIR, "gotiqa.db")}'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


def get_request_data():
    return request.get_json(silent=True) or {}


def parse_datetime(value):
    if not value:
        return None
    return datetime.fromisoformat(value)

# ============ DATABASE MODELS ============

class Animal(db.Model):
    __tablename__ = 'animals'
    
    id = db.Column(db.Integer, primary_key=True)
    tag_number = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=True)
    species = db.Column(db.String(50), nullable=False)  # Cow, Goat, Sheep, Pig, etc.
    breed = db.Column(db.String(100), nullable=True)
    age = db.Column(db.Float, nullable=True)  # in months or years
    gender = db.Column(db.String(10), nullable=False)
    weight = db.Column(db.Float, nullable=True)  # in kg
    date_acquired = db.Column(db.DateTime, default=datetime.utcnow)
    notes = db.Column(db.Text, nullable=True)
    
    # Relationships
    health_records = db.relationship('HealthRecord', backref='animal', lazy=True, cascade='all, delete-orphan')
    production_records = db.relationship('ProductionRecord', backref='animal', lazy=True, cascade='all, delete-orphan')
    breeding_records = db.relationship('BreedingRecord', backref='animal', lazy=True, cascade='all, delete-orphan')
    feeding_records = db.relationship('FeedingRecord', backref='animal', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'tag_number': self.tag_number,
            'name': self.name,
            'species': self.species,
            'breed': self.breed,
            'age': self.age,
            'gender': self.gender,
            'weight': self.weight,
            'date_acquired': self.date_acquired.isoformat() if self.date_acquired else None,
            'notes': self.notes
        }


class HealthRecord(db.Model):
    __tablename__ = 'health_records'
    
    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    health_status = db.Column(db.String(50), nullable=False)  # Healthy, Sick, Injured, etc.
    temperature = db.Column(db.Float, nullable=True)  # in Celsius
    weight = db.Column(db.Float, nullable=True)
    diagnosis = db.Column(db.Text, nullable=True)
    treatment = db.Column(db.Text, nullable=True)
    veterinarian_notes = db.Column(db.Text, nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'animal_id': self.animal_id,
            'date': self.date.isoformat() if self.date else None,
            'health_status': self.health_status,
            'temperature': self.temperature,
            'weight': self.weight,
            'diagnosis': self.diagnosis,
            'treatment': self.treatment,
            'veterinarian_notes': self.veterinarian_notes
        }


class ProductionRecord(db.Model):
    __tablename__ = 'production_records'
    
    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    production_type = db.Column(db.String(50), nullable=False)  # Milk, Eggs, Meat, Wool, etc.
    quantity = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(20), nullable=False)  # kg, liters, pieces, etc.
    quality_grade = db.Column(db.String(10), nullable=True)  # A, B, C, etc.
    notes = db.Column(db.Text, nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'animal_id': self.animal_id,
            'date': self.date.isoformat() if self.date else None,
            'production_type': self.production_type,
            'quantity': self.quantity,
            'unit': self.unit,
            'quality_grade': self.quality_grade,
            'notes': self.notes
        }


class BreedingRecord(db.Model):
    __tablename__ = 'breeding_records'
    
    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'), nullable=False)
    date_of_breeding = db.Column(db.DateTime, nullable=False)
    partner_tag_number = db.Column(db.String(50), nullable=True)
    expected_delivery_date = db.Column(db.DateTime, nullable=True)
    actual_delivery_date = db.Column(db.DateTime, nullable=True)
    offspring_count = db.Column(db.Integer, nullable=True)
    offspring_health = db.Column(db.Text, nullable=True)
    notes = db.Column(db.Text, nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'animal_id': self.animal_id,
            'date_of_breeding': self.date_of_breeding.isoformat() if self.date_of_breeding else None,
            'partner_tag_number': self.partner_tag_number,
            'expected_delivery_date': self.expected_delivery_date.isoformat() if self.expected_delivery_date else None,
            'actual_delivery_date': self.actual_delivery_date.isoformat() if self.actual_delivery_date else None,
            'offspring_count': self.offspring_count,
            'offspring_health': self.offspring_health,
            'notes': self.notes
        }


class FeedingRecord(db.Model):
    __tablename__ = 'feeding_records'
    
    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    feed_type = db.Column(db.String(100), nullable=False)  # Hay, Grain, Pasture, etc.
    quantity = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(20), nullable=False)  # kg, liters, bales, etc.
    cost = db.Column(db.Float, nullable=True)
    notes = db.Column(db.Text, nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'animal_id': self.animal_id,
            'date': self.date.isoformat() if self.date else None,
            'feed_type': self.feed_type,
            'quantity': self.quantity,
            'unit': self.unit,
            'cost': self.cost,
            'notes': self.notes
        }


class UserLog(db.Model):
    __tablename__ = 'user_logs'
    
    id = db.Column(db.Integer, primary_key=True)
    action = db.Column(db.String(100), nullable=False)
    action_type = db.Column(db.String(50), nullable=False)  # Create, Update, Delete, View
    entity_type = db.Column(db.String(50), nullable=False)  # Animal, Health, Production, etc.
    entity_id = db.Column(db.Integer, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    details = db.Column(db.Text, nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'action': self.action,
            'action_type': self.action_type,
            'entity_type': self.entity_type,
            'entity_id': self.entity_id,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'details': self.details
        }


def log_action(action, action_type, entity_type, entity_id=None, details=None):
    """Helper function to log user actions"""
    log = UserLog(
        action=action,
        action_type=action_type,
        entity_type=entity_type,
        entity_id=entity_id,
        details=details
    )
    db.session.add(log)
    db.session.commit()


# ============ API ENDPOINTS - ANIMALS ============

@app.route('/api/animals', methods=['GET'])
def get_animals():
    """Get all animals"""
    animals = Animal.query.all()
    return jsonify([animal.to_dict() for animal in animals]), 200


@app.route('/api/animals/<int:animal_id>', methods=['GET'])
def get_animal(animal_id):
    """Get a specific animal"""
    animal = Animal.query.get_or_404(animal_id)
    log_action('View animal', 'View', 'Animal', animal_id)
    return jsonify(animal.to_dict()), 200


@app.route('/api/animals', methods=['POST'])
def create_animal():
    """Create a new animal"""
    data = get_request_data()
    try:
        animal = Animal(
            tag_number=data['tag_number'],
            name=data.get('name'),
            species=data['species'],
            breed=data.get('breed'),
            age=data.get('age'),
            gender=data['gender'],
            weight=data.get('weight'),
            notes=data.get('notes')
        )
        db.session.add(animal)
        db.session.commit()
        log_action(f'Added animal {data["tag_number"]}', 'Create', 'Animal', animal.id, f"Tag: {data['tag_number']}")
        return jsonify(animal.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@app.route('/api/animals/<int:animal_id>', methods=['PUT'])
def update_animal(animal_id):
    """Update an animal"""
    animal = Animal.query.get_or_404(animal_id)
    data = get_request_data()
    try:
        if 'tag_number' in data:
            animal.tag_number = data['tag_number']
        if 'name' in data:
            animal.name = data['name']
        if 'species' in data:
            animal.species = data['species']
        if 'breed' in data:
            animal.breed = data['breed']
        if 'age' in data:
            animal.age = data['age']
        if 'gender' in data:
            animal.gender = data['gender']
        if 'weight' in data:
            animal.weight = data['weight']
        if 'notes' in data:
            animal.notes = data['notes']
        
        db.session.commit()
        log_action(f'Updated animal {animal.tag_number}', 'Update', 'Animal', animal_id)
        return jsonify(animal.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@app.route('/api/animals/<int:animal_id>', methods=['DELETE'])
def delete_animal(animal_id):
    """Delete an animal"""
    animal = Animal.query.get_or_404(animal_id)
    try:
        tag_number = animal.tag_number
        db.session.delete(animal)
        db.session.commit()
        log_action(f'Deleted animal {tag_number}', 'Delete', 'Animal', animal_id)
        return jsonify({'message': 'Animal deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


# ============ API ENDPOINTS - HEALTH RECORDS ============

@app.route('/api/animals/<int:animal_id>/health', methods=['GET'])
def get_health_records(animal_id):
    """Get all health records for an animal"""
    Animal.query.get_or_404(animal_id)
    records = HealthRecord.query.filter_by(animal_id=animal_id).all()
    return jsonify([record.to_dict() for record in records]), 200


@app.route('/api/health', methods=['POST'])
def create_health_record():
    """Create a new health record"""
    data = get_request_data()
    try:
        record = HealthRecord(
            animal_id=data['animal_id'],
            health_status=data['health_status'],
            temperature=data.get('temperature'),
            weight=data.get('weight'),
            diagnosis=data.get('diagnosis'),
            treatment=data.get('treatment'),
            veterinarian_notes=data.get('veterinarian_notes')
        )
        db.session.add(record)
        db.session.commit()
        log_action('Added health record', 'Create', 'HealthRecord', data['animal_id'])
        return jsonify(record.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@app.route('/api/health/<int:record_id>', methods=['PUT'])
def update_health_record(record_id):
    """Update a health record"""
    record = HealthRecord.query.get_or_404(record_id)
    data = get_request_data()
    try:
        if 'health_status' in data:
            record.health_status = data['health_status']
        if 'temperature' in data:
            record.temperature = data['temperature']
        if 'weight' in data:
            record.weight = data['weight']
        if 'diagnosis' in data:
            record.diagnosis = data['diagnosis']
        if 'treatment' in data:
            record.treatment = data['treatment']
        if 'veterinarian_notes' in data:
            record.veterinarian_notes = data['veterinarian_notes']
        
        db.session.commit()
        log_action('Updated health record', 'Update', 'HealthRecord', record.animal_id)
        return jsonify(record.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


# ============ API ENDPOINTS - PRODUCTION RECORDS ============

@app.route('/api/animals/<int:animal_id>/production', methods=['GET'])
def get_production_records(animal_id):
    """Get all production records for an animal"""
    Animal.query.get_or_404(animal_id)
    records = ProductionRecord.query.filter_by(animal_id=animal_id).all()
    return jsonify([record.to_dict() for record in records]), 200


@app.route('/api/production', methods=['POST'])
def create_production_record():
    """Create a new production record"""
    data = get_request_data()
    try:
        record = ProductionRecord(
            animal_id=data['animal_id'],
            production_type=data['production_type'],
            quantity=data['quantity'],
            unit=data['unit'],
            quality_grade=data.get('quality_grade'),
            notes=data.get('notes')
        )
        db.session.add(record)
        db.session.commit()
        log_action('Added production record', 'Create', 'ProductionRecord', data['animal_id'])
        return jsonify(record.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


# ============ API ENDPOINTS - BREEDING RECORDS ============

@app.route('/api/animals/<int:animal_id>/breeding', methods=['GET'])
def get_breeding_records(animal_id):
    """Get all breeding records for an animal"""
    Animal.query.get_or_404(animal_id)
    records = BreedingRecord.query.filter_by(animal_id=animal_id).all()
    return jsonify([record.to_dict() for record in records]), 200


@app.route('/api/breeding', methods=['POST'])
def create_breeding_record():
    """Create a new breeding record"""
    data = get_request_data()
    try:
        record = BreedingRecord(
            animal_id=data['animal_id'],
            date_of_breeding=parse_datetime(data['date_of_breeding']),
            partner_tag_number=data.get('partner_tag_number'),
            expected_delivery_date=parse_datetime(data.get('expected_delivery_date')),
            actual_delivery_date=parse_datetime(data.get('actual_delivery_date')),
            offspring_count=data.get('offspring_count'),
            offspring_health=data.get('offspring_health'),
            notes=data.get('notes')
        )
        db.session.add(record)
        db.session.commit()
        log_action('Added breeding record', 'Create', 'BreedingRecord', data['animal_id'])
        return jsonify(record.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


# ============ API ENDPOINTS - FEEDING RECORDS ============

@app.route('/api/animals/<int:animal_id>/feeding', methods=['GET'])
def get_feeding_records(animal_id):
    """Get all feeding records for an animal"""
    Animal.query.get_or_404(animal_id)
    records = FeedingRecord.query.filter_by(animal_id=animal_id).all()
    return jsonify([record.to_dict() for record in records]), 200


@app.route('/api/feeding', methods=['POST'])
def create_feeding_record():
    """Create a new feeding record"""
    data = get_request_data()
    try:
        record = FeedingRecord(
            animal_id=data['animal_id'],
            feed_type=data['feed_type'],
            quantity=data['quantity'],
            unit=data['unit'],
            cost=data.get('cost'),
            notes=data.get('notes')
        )
        db.session.add(record)
        db.session.commit()
        log_action('Added feeding record', 'Create', 'FeedingRecord', data['animal_id'])
        return jsonify(record.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


# ============ API ENDPOINTS - USER LOGS ============

@app.route('/api/logs', methods=['GET'])
def get_logs():
    """Get all user logs"""
    logs = UserLog.query.order_by(UserLog.timestamp.desc()).all()
    return jsonify([log.to_dict() for log in logs]), 200


@app.route('/api/logs', methods=['POST'])
def create_user_log():
    """Create a manual user activity log"""
    data = get_request_data()
    try:
        log = UserLog(
            action=data['action'],
            action_type=data.get('action_type', 'Note'),
            entity_type=data.get('entity_type', 'General'),
            entity_id=data.get('entity_id'),
            details=data.get('details')
        )
        db.session.add(log)
        db.session.commit()
        return jsonify(log.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get system statistics"""
    total_animals = Animal.query.count()
    total_health_records = HealthRecord.query.count()
    total_production_records = ProductionRecord.query.count()
    total_breeding_records = BreedingRecord.query.count()
    total_feeding_records = FeedingRecord.query.count()
    
    return jsonify({
        'total_animals': total_animals,
        'total_health_records': total_health_records,
        'total_production_records': total_production_records,
        'total_breeding_records': total_breeding_records,
        'total_feeding_records': total_feeding_records
    }), 200


@app.route('/api/dashboard', methods=['GET'])
def get_dashboard():
    """Get the frontend dashboard payload in one request."""
    stats_response, status_code = get_stats()
    stats = stats_response.get_json()
    recent_animals = Animal.query.order_by(Animal.date_acquired.desc()).limit(5).all()
    recent_logs = UserLog.query.order_by(UserLog.timestamp.desc()).limit(5).all()

    return jsonify({
        'stats': stats,
        'recent_animals': [animal.to_dict() for animal in recent_animals],
        'recent_logs': [log.to_dict() for log in recent_logs]
    }), status_code


# ============ FRONTEND ROUTES ============

@app.route('/', methods=['GET'])
def serve_home():
    """Serve the static frontend from the Flask backend."""
    return send_from_directory(FRONTEND_DIR, 'index.html')


@app.route('/assets/<path:filename>', methods=['GET'])
def serve_frontend_asset(filename):
    return send_from_directory(os.path.join(FRONTEND_DIR, 'assets'), filename)


@app.route('/dashboard', methods=['GET'])
def serve_dashboard():
    return send_from_directory(FRONTEND_DIR, 'dashboard.html')


@app.route('/<path:filename>', methods=['GET'])
def serve_frontend_file(filename):
    pages = {
        'index': 'index.html',
        'home': 'home.html',
        'about': 'about.html',
        'blog': 'blog.html',
        'contact': 'contact.html',
        'products': 'products.html',
        'dashboard': 'dashboard.html',
        'index.html': 'index.html',
        'home.html': 'home.html',
        'about.html': 'about.html',
        'blog.html': 'blog.html',
        'contact.html': 'contact.html',
        'products.html': 'products.html',
        'dashboard.html': 'dashboard.html'
    }
    if filename in pages:
        return send_from_directory(FRONTEND_DIR, pages[filename])
    return jsonify({'error': 'Resource not found'}), 404


# ============ ERROR HANDLERS ============

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404


@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
