import React from 'react';
import './dashboard.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useEffect, useState } from 'react';
import Pagination from '../Products/pagination';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import DashboardLayout from './DashboardLayout';
import ProductModal from './ProductModal';


const CardP = () => {
        const {user} =useAuthContext()
        const [error, setError] = useState(null);
        const [workouts, setWorkouts] = useState([]);
        const [filteredWorkouts, setFilteredWorkouts] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [totalPages, setTotalPages] = useState(1);
        const [searchTerm, setSearchTerm] = useState('');
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
        const [selectedProduct, setSelectedProduct] = useState(null);
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [imageUrl, setImageUrl] = useState('');
        const [quantity, setQuantity] = useState('');
        const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
       
        //logout
     const {logout} = useLogout()


     useEffect(() => {
        const fetchProducts = async (page) => {
            const response = await fetch(`https://last-api-five.vercel.app/api/workouts?page=${page}&limit=12`);
            const data = await response.json();
            if (response.ok) {
                setWorkouts(data.workouts);
                setCurrentPage(data.page);
                setTotalPages(data.totalPages);
            }
        };
        fetchProducts(currentPage);
     }, [currentPage]);

     useEffect(() => {
        if (searchTerm) {
            const filtered = workouts.filter(workout =>
                workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                workout.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredWorkouts(filtered);
        } else {
            setFilteredWorkouts(workouts);
        }
     }, [workouts, searchTerm]);



     const handlePageChange = (page) => {
        setCurrentPage(page);
     };

     const handleSearchChange = (term) => {
        setSearchTerm(term);
     };

     const handleAddNew = () => {
        setModalMode('add');
        setSelectedProduct(null);
        setIsModalOpen(true);
     };

     const handleEdit = (product) => {
        setModalMode('edit');
        setSelectedProduct(product);
        setIsModalOpen(true);
     };

     const handleModalSave = async (productData) => {
        if (modalMode === 'add') {
            await handleAddProduct(productData);
        } else {
            await handleUpdateProduct(productData);
        }
     };

     const handleAddProduct = async (productData) => {
        if (!user) {
            setError("You are not Authorized");
            return;
        }
        const response = await fetch('https://last-api-five.vercel.app/api/workouts', {
            method: 'POST',
            body: JSON.stringify(productData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            toast.error('Failed to add product');
        } else {
            setError(null);
            toast.success('Product added successfully!');
            // Update the workouts state to include the new product
            setWorkouts(prev => [json, ...prev]);
            // Go to the first page to show the new product
            setCurrentPage(1);
        }
     };

     // Remove window.location.reload() calls from add and update handlers

     const handleUpdateProduct = async (productData) => {
        if (!user) {
            setError("You are not Authorized");
            return;
        }
        if (!selectedProduct) {
            setError("No product selected");
            return;
        }
        const response = await fetch('https://last-api-five.vercel.app/api/workouts/' + selectedProduct._id, {
            method: 'PATCH',
            body: JSON.stringify(productData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            toast.error('Failed to update product');
        } else {
            setError(null);
            toast.success('Product updated successfully!');
            // Update the workouts state to reflect the changes
            setWorkouts(prev => prev.map(w => w._id === json._id ? json : w));
        }
     };

     const handleDisplay = async (id) => {
        setSelectedWorkoutId(id); // Store the selected workout ID

        setTitle('');
        setDescription('');
        setImageUrl('');
        setQuantity('');
             
        const response = await fetch('https://last-api-five.vercel.app/api/workouts/' + id);
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        } else {
            setTitle(json.title);
            setDescription(json.description);
            setImageUrl(json.imageUrl);
            setQuantity(json.quantity);
            setError(null);
        }
     };

     const handleAdd = async (e) => {
        e.preventDefault();
        if(!user)
            {
                setError("You are not Authorized")
                return
            }
        const product = { title, description, imageUrl, quantity };
        const response = await fetch('https://last-api-five.vercel.app/api/workouts', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        if (!response.ok && !user) {
            setError(json.error);
        }  
        if (response.ok) {
            setTitle('');
            setDescription('');
            setImageUrl('');
            setQuantity('');
            setError(null);
        }
     };

     const handleUpdate = async (e) => {
        e.preventDefault();
        if(!user)
            {
                setError("You are not Authorized")
                return
            }
        if (!selectedWorkoutId) {setError("Nothing selected")
            return
        }; // Ensure a workout is selected
        const product = { title, description, imageUrl, quantity };
        const response = await fetch('https://last-api-five.vercel.app/api/workouts/' + selectedWorkoutId, {
            method: 'PATCH',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        if (!response.ok && !user) {
            setError(json.error);
        } else {
            alert('Product updated successfully!');
        }
     };


     const handleDelete = async (id) => {
        confirmAlert({
            title: 'Confirmation',
            message: 'Are you sure you want to delete this product?',
            buttons: [
                {
                    label: 'Yes',

                    onClick: async () => {


                        if(!user)
                            {
                                setError("You are not Authorized")
                                return
                            }



                        const response = await fetch('https://last-api-five.vercel.app/api/workouts/' + id, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${user.token}`
                            }
                        });
                        if (!response.ok) {
                            const json = await response.json();
                            setError(json.error);
                        } 
                        
                        else {
                            toast.success('Product deleted successfully!');
                            setWorkouts(workouts.filter(workout => workout._id !== id));
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
     };

      const handleLogout = () =>
        {
            logout()

        };

    
     return (
        <DashboardLayout onSearchChange={handleSearchChange} onLogout={handleLogout} isAdmin={user?.role === 'admin'}>
            <div className="dashboard-content">
                <button className="btn-add-new" onClick={handleAddNew}>Add New</button>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWorkouts.map((product) => (
                            <tr key={product._id}>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.quantity}</td>
                                <td><img src={product.imageUrl} alt={product.title} /></td>
                                <td>
                                    <button className="btn-edit" onClick={() => handleEdit(product)}>Edit</button>
                                    <button className="btn-delete" onClick={() => handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination 
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
                <ProductModal
                    key={isModalOpen ? 'open' : 'closed'}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleModalSave}
                    product={selectedProduct}
                    mode={modalMode}
                />
                <ToastContainer />
            </div>
        </DashboardLayout>
    );
};

export default CardP;




