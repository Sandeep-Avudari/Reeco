import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import OrdersList from './pages/Orders/Container/ordersList';
import OrderManager from './pages/Orders/Container/orderManager';

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/orders" element={<OrdersList />} />
                <Route path="/orders/:orderid" element={<OrderManager />} />
                <Route path="/" element={<Navigate to="/orders" />} />
                <Route path="*" element={<Navigate to="/orders" />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Routing;