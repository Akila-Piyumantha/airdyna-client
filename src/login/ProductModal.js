import React, { useState, useEffect } from 'react';
import './dashboard.css';

const ProductModal = ({ isOpen, onClose, onSave, product, mode }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [quantity, setQuantity] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (product && mode === 'edit') {
            setTitle(product.title || '');
            setDescription(product.description || '');
            setImageUrl(product.imageUrl || '');
            setQuantity(product.quantity || '');
        } else {
            setTitle('');
            setDescription('');
            setImageUrl('');
            setQuantity('');
        }
        setErrors({});
    }, [product, mode, isOpen]);

    const validateForm = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Product name is required';
        if (!description.trim()) newErrors.description = 'Description is required';
        if (!imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
        if (!quantity || quantity <= 0) newErrors.quantity = 'Quantity must be a positive number';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSave({ title, description, imageUrl, quantity });
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', width: '500px', maxWidth: '90%', maxHeight: '90%', overflowY: 'auto' }}>
                <div className="modal-header">
                    <h3>{mode === 'add' ? 'Add New Product' : 'Edit Product'}</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Product Name:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={errors.title ? 'error' : ''}
                        />
                        {errors.title && <span className="error-text">{errors.title}</span>}
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={errors.description ? 'error' : ''}
                        />
                        {errors.description && <span className="error-text">{errors.description}</span>}
                    </div>
                    <div className="form-group">
                        <label>Image URL:</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className={errors.imageUrl ? 'error' : ''}
                        />
                        {errors.imageUrl && <span className="error-text">{errors.imageUrl}</span>}
                    </div>
                    <div className="form-group">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className={errors.quantity ? 'error' : ''}
                        />
                        {errors.quantity && <span className="error-text">{errors.quantity}</span>}
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
                        <button type="submit" className="btn-save">{mode === 'add' ? 'Add Product' : 'Update Product'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
