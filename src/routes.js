import { Routes, Route, Navigate } from 'react-router-dom';
import OrdersList from './pages/Orders/Container/ordersList';
import OrderManager from './pages/Orders/Container/orderManager';
import PageNotFound from './pages/pageNotFound';

function Routing() {
    return (
        <Routes>
            <Route path="/orders" exact element={<OrdersList />} />
            <Route path="/orders/:orderid" exact element={<OrderManager />} />
            <Route path="/store" exact element={<PageNotFound />} />
            <Route path="/analytics" exact element={<PageNotFound />} />
            <Route path="/" element={<Navigate to="/orders" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}
export default Routing;