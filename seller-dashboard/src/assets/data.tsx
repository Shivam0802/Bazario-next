import { DollarSign, Shield, Truck, Users, BarChart2, CheckCircle } from 'lucide-react';

export const states = [
   { label: "Andhra Pradesh", value: "Andhra Pradesh" },
   {  label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
   {  label: "Assam", value: "Assam" },
   {  label: "Bihar", value: "Bihar" },
   {  label: "Chhattisgarh", value: "Chhattisgarh" },
   {  label: "Goa", value: "Goa" },
   {  label: "Gujarat", value: "Gujarat" },
   {  label: "Haryana", value: "Haryana" },
   {  label: "Himachal Pradesh", value: "Himachal Pradesh" },
   {  label: "Jharkhand", value: "Jharkhand" },
   {  label: "Karnataka", value: "Karnataka" },
   {  label: "Kerala", value: "Kerala" },
   {  label: "Madhya Pradesh", value: "Madhya Pradesh" },
   {  label: "Maharashtra", value: "Maharashtra" },
   {  label: "Manipur", value: "Manipur" },
   {  label: "Meghalaya", value: "Meghalaya" },
   {  label: "Mizoram", value: "Mizoram" },
   {  label: "Nagaland", value: "Nagaland" },
   {  label: "Odisha", value: "Odisha" },
   {  label: "Punjab", value: "Punjab" },
   {  label: "Rajasthan", value: "Rajasthan" },
   {  label: "Sikkim", value: "Sikkim" },
   {  label: "Tamil Nadu", value: "Tamil Nadu" },
   {  label: "Telangana", value: "Telangana" },
   {  label: "Tripura", value: "Tripura" },
   {  label: "Uttar Pradesh", value: "Uttar Pradesh" },
   {  label: "Uttarakhand", value: "Uttarakhand" },
   {  label: "West Bengal", value: "West Bengal" },
   {  label: "Andaman and Nicobar Islands", value: "Andaman and Nicobar Islands" },
   {  label: "Chandigarh", value: "Chandigarh" },
   {  label: "Dadra and Nagar Haveli and Daman and Diu", value: "Dadra and Nagar Haveli and Daman and Diu" },
   {  label: "Lakshadweep", value: "Lakshadweep" },
   {  label: "Delhi", value: "Delhi" },
   {  label: "Puducherry", value: "Puducherry" },
   {  label: "Ladakh", value: "Ladakh" },
   {  label: "Jammu and Kashmir", value: "Jammu and Kashmir" }
]


export const genderOptions = [
   { value: "Male", label: "Male" },
   { value: "Female", label:"Female"},
   { value: "Other", label: "Other" }
 ]

export const features = [
   {
       id: 1,
       icon: <DollarSign className="w-8 h-8 text-orange-600" />,
       title: 'Earn More',
       description: 'Sell your products to millions of customers and grow your business with Bazario.',
   },
   {
       id: 2,
       icon: <Shield className="w-8 h-8 text-orange-600" />,
       title: 'Secure Payments',
       description: 'Get paid securely and on time with our trusted payment gateway.',
   },
   {
       id: 3,
       icon: <Truck className="w-8 h-8 text-orange-600" />,
       title: 'Easy Logistics',
       description: 'We handle shipping and delivery, so you can focus on growing your business.',
   },
   {
       id: 4,
       icon: <Users className="w-8 h-8 text-orange-600" />,
       title: 'Reach More Customers',
       description: 'Access a large customer base and increase your sales with our platform.',
   },
   {
       id: 5,
       icon: <BarChart2 className="w-8 h-8 text-orange-600" />,
       title: 'Analytics & Insights',
       description: 'Track your sales and performance with detailed analytics and reports.',
   },
   {
       id: 6,
       icon: <CheckCircle className="w-8 h-8 text-orange-600" />,
       title: 'Easy Onboarding',
       description: 'Become a seller in just a few simple steps and start selling immediately.',
   },
];


export const productCategories = [
    { id: 1, name: "Electronics", subCategories: ["Mobiles", "Laptops", "Tablets", "Smartwatches", "Headphones", "Cameras"], image:() => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cable"><path d="M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1"/><path d="M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9"/><path d="M21 21v-2h-4"/><path d="M3 5h4V3"/><path d="M7 5a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1V3"/></svg>) },
    { id: 2, name: "Fashion", subCategories:[ "Men's Fashion", "Women's Fashion", "Kids' Fashion", "Accessories"], image: () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shirt"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>)},
    { id: 3, name: "Jewellery", subCategories: ["Earrings", "Necklaces", "Rings", "Bracelets", "Anklets"], image: () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gem"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>)},
    { id: 3, name: "Footwear", subCategories:[ "Men's Footwear", "Women's Footwear", "Kids' Footwear", "Sports Shoes", "Casual Shoes", "Formal Shoes"], image:() => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-footprints"><path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/><path d="M16 17h4"/><path d="M4 13h4"/></svg>) },
    { id: 4, name: "Beauty & Personal Care", subCategories: ["Makeup", "Skincare", "Haircare", "Fragrances", "Personal Hygiene"], image: () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-coins"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></svg>) },
    { id: 5, name: "Books & Stationery" , subCategories: ["Fiction", "Non-Fiction", "Children's Books", "Office Supplies", "Art Supplies"], image:() => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-copy"><path d="M2 16V4a2 2 0 0 1 2-2h11"/><path d="M22 18H11a2 2 0 1 0 0 4h10.5a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5H11a2 2 0 0 0-2 2v12"/><path d="M5 14H4a2 2 0 1 0 0 4h1"/></svg>)
    },
    { id: 6, name: "Sports & Fitness" , subCategories: ["Fitness Equipment", "Sports Gear", "Athletic Wear", "Outdoor Recreation", "Yoga & Meditation"],
        image: () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volleyball"><path d="M11.1 7.1a16.55 16.55 0 0 1 10.9 4"/><path d="M12 12a12.6 12.6 0 0 1-8.7 5"/><path d="M16.8 13.6a16.55 16.55 0 0 1-9 7.5"/><path d="M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10"/><path d="M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5"/><circle cx="12" cy="12" r="10"/></svg>)
    },
    { id: 7, name: "Toys & Games" , subCategories: ["Action Figures", "Board Games", "Educational Toys", "Puzzles", "Outdoor Toys"], image: () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-blocks"><rect width="7" height="7" x="14" y="3" rx="1"/><path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"/></svg>)},
    { id: 8, name: "Grocery & Gourmet", subCategories: ["Food Staples", "Beverages", "Snacks", "Cooking Essentials", "Gourmet Foods"], image:() => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cherry"><path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"/><path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"/><path d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"/><path d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"/></svg>)},
    { id: 9, name: "Health & Wellness", subCategories: ["Vitamins & Supplements", "Fitness Trackers", "Health Monitors", "Personal Care", "Wellness Products"], image:() => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-pulse"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>)},
    { id: 10, name: "Home & Kitchen", subCategories: ["Cookware", "Dining & Serving", "Home Decor", "Furniture", "Cleaning Supplies"],
        image:() => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cooking-pot"><path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"/></svg>)
    },
];