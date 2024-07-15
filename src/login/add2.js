import {useEffect,useState}from 'react';
import CardP from './form';

const Addpage = ()=>
    {
        const [workouts, setWorkouts] = useState(null)

        useEffect(() => {
            const fetchProducts = async () => {
                const response = await fetch('https://last-api-five.vercel.app/api/workouts')
                const json = await response.json()
    
                if (response.ok) {
                    setWorkouts(json)
                }
            }
            fetchProducts()
        }, [])

        return(
           
            <div >   
                <CardP/>
            </div>
            

        );

    };

    export default Addpage