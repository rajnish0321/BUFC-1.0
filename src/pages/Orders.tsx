
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ShoppingBag, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('active');
  const { toast } = useToast();
  
  const handleTrackOrder = (orderId: string) => {
    toast({
      title: "Order Tracking",
      description: "Order tracking will be implemented in the next version!",
    });
  };
  
  return (
    <MainLayout>
      <div className="bufc-container py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        
        <Tabs defaultValue="active" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger 
              value="active" 
              className="data-[state=active]:bg-bufc-blue data-[state=active]:text-white"
            >
              Active
            </TabsTrigger>
            <TabsTrigger 
              value="past" 
              className="data-[state=active]:bg-bufc-blue data-[state=active]:text-white"
            >
              Past
            </TabsTrigger>
            <TabsTrigger 
              value="cancelled" 
              className="data-[state=active]:bg-bufc-blue data-[state=active]:text-white"
            >
              Cancelled
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeOrders.length > 0 ? (
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    onTrackOrder={handleTrackOrder} 
                  />
                ))}
              </div>
            ) : (
              <EmptyState 
                title="No active orders" 
                description="You don't have any active orders at the moment." 
                icon={<ShoppingBag size={48} className="text-gray-400" />}
              />
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastOrders.length > 0 ? (
              <div className="space-y-4">
                {pastOrders.map((order) => (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    onTrackOrder={handleTrackOrder} 
                  />
                ))}
              </div>
            ) : (
              <EmptyState 
                title="No past orders" 
                description="You haven't placed any orders yet." 
                icon={<ShoppingBag size={48} className="text-gray-400" />}
              />
            )}
          </TabsContent>
          
          <TabsContent value="cancelled">
            {cancelledOrders.length > 0 ? (
              <div className="space-y-4">
                {cancelledOrders.map((order) => (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    onTrackOrder={handleTrackOrder} 
                  />
                ))}
              </div>
            ) : (
              <EmptyState 
                title="No cancelled orders" 
                description="You don't have any cancelled orders." 
                icon={<AlertCircle size={48} className="text-gray-400" />}
              />
            )}
          </TabsContent>
        </Tabs>
        
        {/* Instructions */}
        {activeTab === 'active' && activeOrders.length > 0 && (
          <div className="bg-bufc-lightblue rounded-lg p-5 mt-8">
            <h3 className="text-lg font-semibold mb-3">How to collect your order:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Arrive at the outlet during your selected time slot.</li>
              <li>Show your Order ID to the counter staff.</li>
              <li>Skip the regular queue and collect your order directly.</li>
            </ol>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

// Order card component
const OrderCard = ({ 
  order, 
  onTrackOrder 
}: { 
  order: typeof activeOrders[0], 
  onTrackOrder: (orderId: string) => void 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">
              Order #{order.id}
            </CardTitle>
            <p className="text-sm text-gray-500">{order.date}</p>
          </div>
          <Badge 
            className={`
              ${order.status === 'Ready' ? 'bg-green-500' : ''}
              ${order.status === 'Preparing' ? 'bg-bufc-orange' : ''}
              ${order.status === 'Placed' ? 'bg-blue-500' : ''}
              ${order.status === 'Completed' ? 'bg-gray-500' : ''}
              ${order.status === 'Cancelled' ? 'bg-red-500' : ''}
            `}
          >
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">{order.outlet}</h4>
          <ul className="text-sm space-y-1">
            {order.items.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.quantity}x {item.name}</span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border-t border-gray-200 pt-3 flex justify-between">
          <div className="flex items-center text-sm">
            <Clock size={16} className="mr-1 text-gray-500" />
            <span>Pickup: {order.pickupSlot}</span>
          </div>
          <div className="font-semibold">
            Total: ₹{order.total}
          </div>
        </div>
        
        {(order.status === 'Placed' || order.status === 'Preparing' || order.status === 'Ready') && (
          <div className="mt-4 flex justify-end">
            <button 
              className="text-bufc-blue hover:underline font-medium text-sm"
              onClick={() => onTrackOrder(order.id)}
            >
              Track Order
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Empty state component
const EmptyState = ({ 
  title, 
  description, 
  icon 
}: { 
  title: string, 
  description: string, 
  icon: React.ReactNode 
}) => {
  return (
    <div className="text-center py-10 px-4">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

// Sample data
const activeOrders = [
  {
    id: 'ORD7890',
    outlet: 'Kathi Junction',
    date: 'Today, 12:30 PM',
    status: 'Preparing',
    total: 260,
    pickupSlot: '1:00 PM - 1:15 PM',
    items: [
      { name: 'Paneer Kathi Roll', quantity: 1, price: 120 },
      { name: 'French Fries', quantity: 1, price: 80 },
      { name: 'Masala Cola', quantity: 1, price: 60 }
    ]
  },
];

const pastOrders = [
  {
    id: 'ORD6543',
    outlet: 'Dosa Point',
    date: 'Apr 6, 11:45 AM',
    status: 'Completed',
    total: 190,
    pickupSlot: '12:15 PM - 12:30 PM',
    items: [
      { name: 'Masala Dosa', quantity: 1, price: 110 },
      { name: 'Idli Sambar', quantity: 1, price: 80 }
    ]
  },
  {
    id: 'ORD5432',
    outlet: 'Kathi Junction',
    date: 'Apr 5, 2:15 PM',
    status: 'Completed',
    total: 150,
    pickupSlot: '2:45 PM - 3:00 PM',
    items: [
      { name: 'Chicken Kathi Roll', quantity: 1, price: 150 }
    ]
  }
];

const cancelledOrders = [];

export default Orders;
