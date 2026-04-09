/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Billing from './pages/Billing';
import Logistics from './pages/Logistics';
import Reports from './pages/Reports';
import CRM from './pages/CRM';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/crm" element={<CRM />} />
        </Routes>
      </Layout>
    </Router>
  );
}
