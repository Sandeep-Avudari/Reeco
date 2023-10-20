import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import OrdersList from './pages/Orders/Container/ordersList';
import OrderManager from './pages/Orders/Container/orderManager';
import PageNotFound from './pages/pageNotFound';

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/orders"  element={<OrdersList />} />
                <Route path="/orders/:orderid" element={<OrderManager />} />
                <Route path="/store" element={<PageNotFound />} />
                <Route path="/analytics" element={<PageNotFound />} />
                <Route path="/" element={<Navigate to="/orders" />} />
                <Route path="*" element={<Navigate to="/orders" />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Routing;