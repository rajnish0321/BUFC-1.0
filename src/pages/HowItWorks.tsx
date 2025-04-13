
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Clock, CheckCircle, User, BarChart3 } from 'lucide-react';

const HowItWorks = () => {
  return (
    <MainLayout>
      <div className="bufc-container py-8">
        <h1 className="text-3xl font-bold mb-4">How BUFC Works</h1>
        <p className="text-lg text-gray-600 mb-8">
          Bennett University Food Courtyard (BUFC) simplifies campus dining by allowing you to skip the long lines and order food in advance.
        </p>
        
        {/* Student Flow */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <User className="mr-2 text-bufc-blue" />
            For Students
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentSteps.map((step, index) => (
              <Card key={index} className="relative">
                <div className="absolute top-4 left-4 w-8 h-8 bg-bufc-blue text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <CardContent className="pt-16 pb-6">
                  <div className="mb-4 flex justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Staff Flow */}
        <section className="mb-12 bg-bufc-lightblue rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BarChart3 className="mr-2 text-bufc-blue" />
            For Outlet Staff
          </h2>
          
          <div className="space-y-6">
            {staffSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-bufc-blue text-white rounded-full flex items-center justify-center font-bold shrink-0 mt-1">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Benefits */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Benefits of Using BUFC</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4 p-5 border border-gray-200 rounded-lg">
                <div className="text-bufc-blue">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-5 bg-gray-50 font-semibold">
                  {faq.question}
                </div>
                <div className="p-5">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

// Data
const studentSteps = [
  {
    title: 'Browse & Order',
    description: 'Browse the menu from your favorite campus outlets and select your items.',
    icon: <ShoppingBag size={36} className="text-bufc-blue" />
  },
  {
    title: 'Choose Pickup Slot',
    description: "Select a convenient time slot when you'd like to collect your food.",
    icon: <Clock size={36} className="text-bufc-blue" />
  },
  {
    title: 'Skip the Queue',
    description: 'Show your order ID at the counter and collect your food without waiting in line.',
    icon: <CheckCircle size={36} className="text-bufc-blue" />
  }
];

const staffSteps = [
  {
    title: 'Receive Orders in Real-time',
    description: 'Staff can view all incoming orders through a dedicated dashboard, sorted by pickup time slots.'
  },
  {
    title: 'Prepare Orders According to Slots',
    description: 'The system organizes orders by time slots, allowing staff to plan their preparation efficiently.'
  },
  {
    title: 'Mark Orders as Ready',
    description: 'Once an order is prepared, staff can mark it as "Ready for Pickup", notifying the student.'
  },
  {
    title: 'Verify and Hand Over',
    description: 'When students arrive, staff verify the order ID and hand over the prepared food.'
  }
];

const benefits = [
  {
    title: 'No More Long Queues',
    description: 'Save valuable time by skipping the lines during peak lunch hours.'
  },
  {
    title: 'Better Planning for Students',
    description: 'Schedule your meals around your classes without worrying about wait times.'
  },
  {
    title: 'Efficient Resource Management for Outlets',
    description: 'Outlets can better predict demand and prepare food in advance to serve more students.'
  },
  {
    title: 'Reduced Food Wastage',
    description: 'Pre-orders help outlets prepare the right amount of food, reducing overall wastage.'
  },
  {
    title: 'Enhanced Campus Experience',
    description: 'A more efficient dining system improves the overall quality of campus life.'
  },
  {
    title: 'Transparent Process',
    description: 'Clear visibility on order status and pickup times for both students and staff.'
  }
];

const faqs = [
  {
    question: 'How far in advance can I place an order?',
    answer: 'You can place orders up to 24 hours in advance. However, same-day ordering is also available as long as time slots are open.'
  },
  {
    question: 'What happens if I miss my pickup slot?',
    answer: 'If you miss your pickup slot, your order will be held for an additional 15 minutes. After that, you may need to contact the outlet staff directly.'
  },
  {
    question: 'Can I modify my order after placing it?',
    answer: 'Orders can be modified up to 30 minutes before your selected pickup slot. After that, the order is locked for preparation.'
  },
  {
    question: 'How do I pay for my order?',
    answer: 'Currently, BUFC operates on a pay-at-pickup system. We plan to integrate online payment options in future updates.'
  },
  {
    question: 'What if an item is unavailable after I order it?',
    answer: 'The outlet staff will contact you directly if an item becomes unavailable, offering alternatives or partial order fulfillment.'
  }
];

export default HowItWorks;
