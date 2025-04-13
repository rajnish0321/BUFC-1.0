import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Minus, Filter, ShoppingCart, X, CreditCard, Wallet, Banknote, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const searchParams = new URLSearchParams(location.search);
  const outletParam = searchParams.get('outlet');
  
  const [selectedOutlet, setSelectedOutlet] = useState(outletParam || 'kathi-junction');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cart, setCart] = useState<{
    [key: string]: {
      id: string;
      name: string;
      price: number;
      quantity: number;
      outlet: string;
    }
  }>({});
  
  const { toast } = useToast();
  
  const handleOutletSelect = (outlet: string) => {
    // If selecting a coming soon outlet, show toast instead of changing tab
    if (outlet !== 'kathi-junction') {
      toast({
        title: "Coming Soon!",
        description: `${outlets.find(o => o.id === outlet)?.name} will be available soon.`,
        duration: 3000,
      });
      return;
    }
    
    setSelectedOutlet(outlet);
    setSelectedCategory('all');
  };
  
  // Filter menu items based on selected outlet and category
  const filteredItems = menuItems.filter(item => 
    item.outlet === selectedOutlet && 
    (selectedCategory === 'all' || item.category === selectedCategory)
  );
  
  // Get categories for the selected outlet
  const categories = ['all', ...new Set(menuItems
    .filter(item => item.outlet === selectedOutlet)
    .map(item => item.category))];
  
  const handleAddToCart = (item: typeof menuItems[0]) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[item.id]) {
        newCart[item.id].quantity += 1;
      } else {
        newCart[item.id] = {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          outlet: item.outlet
        };
      }
      return newCart;
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };
  
  const handleRemoveFromCart = (itemId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId].quantity > 1) {
        newCart[itemId].quantity -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };
  
  const getItemQuantityInCart = (itemId: string) => {
    return cart[itemId]?.quantity || 0;
  };
  
  const totalCartItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate cart total
  const cartTotal = Object.values(cart).reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to place your order",
        duration: 5000,
      });
      setIsCartOpen(false);
      navigate('/login');
      return;
    }

    toast({
      title: "Order Placed Successfully!",
      description: `Your order will be ready in 20-25 minutes. Payment method: ${paymentMethod}`,
      duration: 5000,
    });
    setCart({});
    setIsCartOpen(false);
  };

  return (
    <MainLayout>
      <div className="bufc-container py-8 mt-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Menu</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={18} />
            <span>View Cart</span>
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-bufc-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </Button>
        </div>
        
        {/* Outlet Selection */}
        <Tabs 
          defaultValue={selectedOutlet} 
          className="mb-8"
          value={selectedOutlet}
        >
          <TabsList className="grid grid-cols-4 mb-4">
            {outlets.map(outlet => (
              <TabsTrigger 
                key={outlet.id}
                value={outlet.id}
                onClick={() => handleOutletSelect(outlet.id)}
                className={`data-[state=active]:bg-bufc-blue data-[state=active]:text-white relative ${outlet.comingSoon ? 'opacity-70' : ''}`}
              >
                {outlet.name}
                {outlet.comingSoon && (
                  <span className="absolute -top-2 -right-2 bg-bufc-orange text-white text-[10px] px-1 rounded-full">
                    Soon
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        {/* Category Filters - Only shown for active outlet */}
        {selectedOutlet === 'kathi-junction' && (
          <div className="flex items-center mb-8 overflow-x-auto pb-2">
            <Filter size={16} className="mr-2 text-gray-500" />
            <div className="flex gap-2">
              {categories.map((category, index) => (
                <Button 
                  key={index}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? "bg-bufc-blue text-white" : ""}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <span className="font-semibold text-bufc-blue">₹{item.price}</span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${item.veg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.veg ? 'Veg' : 'Non-Veg'}
                    </span>
                    {item.bestSeller && (
                      <span className="inline-block ml-2 px-2 py-1 bg-bufc-orange bg-opacity-10 text-bufc-orange rounded-full text-xs">
                        Bestseller
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    {getItemQuantityInCart(item.id) > 0 ? (
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="w-6 text-center">{getItemQuantityInCart(item.id)}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 bg-bufc-blue text-white hover:bg-blue-700 border-bufc-blue"
                          onClick={() => handleAddToCart(item)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="bufc-button-primary"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No items available in this category.</p>
          </div>
        )}

        {/* Cart Modal */}
        <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
          <DialogContent className="sm:max-w-[500px] h-[85vh] p-0 flex flex-col">
            <DialogHeader className="flex-none p-6 border-b">
              <DialogTitle className="flex items-center gap-2">
                <ShoppingCart size={20} />
                Your Cart
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto px-6">
              {Object.values(cart).length > 0 ? (
                <div className="space-y-4">
                  {/* Cart Items - Scrollable */}
                  <div className="space-y-3 py-4">
                    {Object.values(cart).map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">₹{item.price * item.quantity}</p>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleRemoveFromCart(item.id)}
                            >
                              <Minus size={16} />
                            </Button>
                            <span className="w-6 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 bg-bufc-blue text-white hover:bg-blue-700 border-bufc-blue"
                              onClick={() => handleAddToCart(menuItems.find(i => i.id === item.id)!)}
                            >
                              <Plus size={16} />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart size={40} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              )}
            </div>

            {/* Fixed Bottom Section */}
            <div className="flex-none border-t bg-white p-6">
              {Object.values(cart).length > 0 && (
                <>
                  {user ? (
                    <>
                      {/* Payment Method Selection */}
                      <div className="mb-6">
                        <h3 className="font-medium mb-3">Select Payment Method</h3>
                        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="card" id="card" />
                              <Label htmlFor="card" className="flex items-center gap-2">
                                <CreditCard size={16} />
                                Card Payment
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="upi" id="upi" />
                              <Label htmlFor="upi" className="flex items-center gap-2">
                                <Wallet size={16} />
                                UPI Payment
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="cash" id="cash" />
                              <Label htmlFor="cash" className="flex items-center gap-2">
                                <Banknote size={16} />
                                Cash on Delivery
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Cart Summary */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal</span>
                          <span>₹{cartTotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Delivery Fee</span>
                          <span>₹20</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                          <span>Total</span>
                          <span>₹{cartTotal + 20}</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-bufc-blue hover:bg-blue-700 mt-6"
                        onClick={handleCheckout}
                      >
                        Place Order (₹{cartTotal + 20})
                      </Button>
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="mb-4">
                        <LogIn size={40} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600 mb-2">Please login to complete your order</p>
                        <p className="text-sm text-gray-500">Your cart will be saved</p>
                      </div>
                      <Button 
                        className="w-full bg-bufc-blue hover:bg-blue-700"
                        onClick={() => {
                          setIsCartOpen(false);
                          navigate('/login');
                        }}
                      >
                        Login to Continue
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

// Updated outlets data
const outlets = [
  {
    id: 'kathi-junction',
    name: 'Kathi Junction',
    comingSoon: false
  },
  {
    id: 'southern',
    name: 'Southern',
    comingSoon: true
  },
  {
    id: 'snapeats',
    name: 'SnapEats',
    comingSoon: true
  },
  {
    id: 'dominos',
    name: 'Dominos',
    comingSoon: true
  }
];

// Sample menu items data - only Kathi Junction is active
const menuItems = [
  {
    id: 'kj-1',
    name: 'Paneer Kathi Roll',
    description: 'Soft paneer with spices wrapped in a fresh paratha.',
    price: 120,
    veg: true,
    bestSeller: true,
    category: 'rolls',
    outlet: 'kathi-junction',
    image: 'https://images.unsplash.com/photo-1551326844-4df70f78d0e9?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'kj-2',
    name: 'Chicken Kathi Roll',
    description: 'Juicy chicken pieces marinated with spices and wrapped in a fresh paratha.',
    price: 150,
    veg: false,
    bestSeller: true,
    category: 'rolls',
    outlet: 'kathi-junction',
    image: 'https://images.unsplash.com/photo-1576488489579-6967c02c56fc?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'kj-3',
    name: 'Egg Kathi Roll',
    description: 'Delicious egg wrap with vegetables and special spices.',
    price: 100,
    veg: false,
    bestSeller: false,
    category: 'rolls',
    outlet: 'kathi-junction',
    image: 'https://images.unsplash.com/photo-1512838243191-e81e8f66f1fd?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'kj-4',
    name: 'French Fries',
    description: 'Crispy golden fries served with ketchup.',
    price: 80,
    veg: true,
    bestSeller: false,
    category: 'sides',
    outlet: 'kathi-junction',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'kj-5',
    name: 'Masala Cola',
    description: 'Refreshing cola with a spicy twist.',
    price: 40,
    veg: true,
    bestSeller: false,
    category: 'beverages',
    outlet: 'kathi-junction',
    image: 'https://images.unsplash.com/photo-1596803244018-908ee5dffda5?auto=format&fit=crop&q=80&w=500'
  }
  // No menu items for other outlets as they are coming soon
];

export default Menu;
