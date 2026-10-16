import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddFruit.css';

function AddFruit({ addFruit }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    color: '',
    imageUrl: '',
    facts: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedFruit, setSubmittedFruit] = useState(null);

  const categories = ['tropical', 'berries', 'citrus', 'stone', 'common'];

  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Fruit name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Fruit name must be at least 2 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.color.trim()) {
      newErrors.color = 'Color is required';
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }

    if (!formData.facts.trim()) {
      newErrors.facts = 'Please provide some interesting facts';
    } else if (formData.facts.length < 20) {
      newErrors.facts = 'Facts should be at least 20 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // URL validation helper
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create new fruit object
      const newFruit = {
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        image: formData.imageUrl,
        color: formData.color,
        facts: formData.facts
      };
      
      // Add fruit to the main list
      addFruit(newFruit);
      
      // Store for preview
      setSubmittedFruit(newFruit);
      setSubmitted(true);
      
      // Redirect to gallery after 3 seconds
      setTimeout(() => {
        navigate('/gallery');
      }, 3000);
    }
  };

  // Reset form handler
  const handleReset = () => {
    setFormData({
      name: '',
      category: '',
      color: '',
      imageUrl: '',
      facts: ''
    });
    setErrors({});
    setSubmitted(false);
    setSubmittedFruit(null);
  };

  return (
    <div className="add-fruit-container">
      <div className="add-fruit-header">
        <h1 className="add-fruit-title">🍎 Add Your Own Fruit</h1>
        <p className="add-fruit-subtitle">
          Share your favorite fruit with the community!
        </p>
      </div>

      {submitted && submittedFruit && (
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h2>Fruit Added Successfully!</h2>
          <div className="submitted-fruit-preview">
            <img src={submittedFruit.image} alt={submittedFruit.name} />
            <h3>{submittedFruit.name}</h3>
            <p className="fruit-category">{submittedFruit.category}</p>
            <p className="fruit-color">Color: {submittedFruit.color}</p>
            <p className="fruit-facts">{submittedFruit.facts}</p>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
            Redirecting to gallery in 3 seconds...
          </p>
        </div>
      )}

      {!submitted && (
        <form className="add-fruit-form" onSubmit={handleSubmit}>
          
          {/* Fruit Name Input */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Fruit Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="e.g., Mango, Apple, Strawberry"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Category Dropdown */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category <span className="required">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-select ${errors.category ? 'error' : ''}`}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          {/* Color Input */}
          <div className="form-group">
            <label htmlFor="color" className="form-label">
              Color <span className="required">*</span>
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className={`form-input ${errors.color ? 'error' : ''}`}
              placeholder="e.g., Red, Yellow, Orange"
            />
            {errors.color && <span className="error-message">{errors.color}</span>}
          </div>

          {/* Image URL Input */}
          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">
              Image URL <span className="required">*</span>
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className={`form-input ${errors.imageUrl ? 'error' : ''}`}
              placeholder="https://example.com/fruit-image.jpg"
            />
            {errors.imageUrl && <span className="error-message">{errors.imageUrl}</span>}
            <small className="form-hint">
              Tip: Use free image URLs from Unsplash or Pexels
            </small>
          </div>

          {/* Facts Textarea */}
          <div className="form-group">
            <label htmlFor="facts" className="form-label">
              Interesting Facts <span className="required">*</span>
            </label>
            <textarea
              id="facts"
              name="facts"
              value={formData.facts}
              onChange={handleChange}
              className={`form-textarea ${errors.facts ? 'error' : ''}`}
              placeholder="Share something interesting about this fruit..."
              rows="4"
            />
            {errors.facts && <span className="error-message">{errors.facts}</span>}
            <small className="form-hint">
              Minimum 20 characters. Tell us about nutrition, origin, or fun facts!
            </small>
          </div>

          {/* Form Buttons */}
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              🍓 Add Fruit
            </button>
            <button type="button" onClick={handleReset} className="btn-reset">
              Reset Form
            </button>
          </div>

        </form>
      )}

      {/* Info Section */}
      <div className="form-info">
        <h3>📝 Submission Guidelines</h3>
        <ul>
          <li>Provide accurate information about the fruit</li>
          <li>Use high-quality images (at least 300x300px)</li>
          <li>Write interesting and educational facts</li>
          <li>All fields marked with * are required</li>
        </ul>
      </div>
    </div>
  );
}

export default AddFruit;
