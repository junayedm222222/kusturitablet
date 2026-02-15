"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Phone, ShoppingCart, CheckCircle, Lock, ShieldCheck, Plus, Minus } from "lucide-react";

export default function Home() {
  // --- CONFIGURATION ---
  // ধাপ ১ এ পাওয়া Google Web App URL টি এখানে পেস্ট করুন
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzPGaDB9ZIzjr_CD1G2hT_ZQmX91K1kpBJLvfnWSD4dVXAJamll8fRR-9xo-yr_IVcV/exec"; 
  
  const PRODUCT_PRICE = 1250; // ১ পিসের দাম
  
  // --- STATES ---
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // --- TIMER LOGIC ---
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    // Set a random countdown for urgency (e.g., 2 hours remaining)
    const target = new Date().getTime() + 2 * 60 * 60 * 1000;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTime({
          h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- HANDLERS ---
  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleScrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(!formData.name || !formData.phone || !formData.address) {
      alert("দয়া করে নাম, ঠিকানা এবং ফোন নাম্বার পূরণ করুন।");
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      productName: "Organic Food Pack",
      quantity: quantity,
      totalPrice: quantity * PRODUCT_PRICE
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Google Apps Script requires no-cors for simple posts
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      // Since no-cors returns opaque response, we assume success if no error
      setOrderSuccess(true);
      setFormData({ name: "", phone: "", address: "" });
      setQuantity(1);
      alert("আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।");
    } catch (error) {
      console.error("Error:", error);
      alert("কোথাও কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      
      {/* --- SECTION 1: HERO --- */}
      <section className="relative bg-black min-h-[500px] flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Overlay - Replace URL with your couple image */}
        <div className="absolute inset-0 opacity-40">
           <Image src="/bg.jpg" alt="bg" fill className="object-cover" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto py-10">
          {/* Logo Placeholder */}
          <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
             <span className="text-green-700 font-bold text-xs">ঔষধি হেলথ<br/>কেয়ার</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-4 leading-tight">
            দাম্পত্য জীবনে সুখ ফেরাতে <span className="text-red-500">১০০%</span>
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-green-500 mb-6 drop-shadow-md">
            <span className="text-red-600">পরীক্ষিত</span> সমাধান
          </h2>
          
          <p className="text-white text-sm md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            স্ত্রীর কাছে লজ্জিত, বিবাহিত জীবনে অশান্তি, মিলনে তৃপ্তির ১০০% পরীক্ষিত সমাধান। হয়ে উঠুন স্ট্রং আর বিশেষ মুহূর্তকে করেন আরো দীর্ঘ। অর্ডার করতে অগ্রিম কোন টাকা দিতে হবে না, সারা দেশে ৩-৪ দিনের মধ্যে ক্যাশ অন ডেলিভারি পেতে এখনই অর্ডার করুন।
          </p>
          
          {/* Curved Bottom SVG can be added via CSS or Image */}
        </div>
      </section>

      {/* --- SECTION 2: PRODUCT & TIMER --- */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 flex flex-col items-center">
           {/* Product Image Carousel Placeholder */}
           <div className="relative w-full max-w-lg aspect-square mb-6">
              <div className="w-full h-full bg-gray-100 relative">
                 <Image src="/k.jpg" alt="Product" fill className="object-cover"/>
              </div>
           </div>

           <div className="text-center space-y-4">
              <p className="text-lg font-bold">কোনো সাইড ইফেক্ট নাই এটা সম্পূর্ণ প্রাকৃতিক, বাংলাদেশ সায়েন্স ল্যাব থেকে পরীক্ষিত, এটা ১০০% নিরাপদ এবং ১০০% কার্যকরী</p>
              
              <h3 className="text-3xl font-bold text-green-600">অফারটি সীমিত সময়ের জন্য</h3>
              <h3 className="text-3xl font-bold text-red-600 animate-pulse">শর্ত সাপেক্ষে</h3>
              <p className="text-xl font-bold text-green-700">সময় শেষ হওয়ার আগেই অর্ডারটি কনফার্ম করুন</p>

              {/* Countdown Timer */}
              <div className="flex justify-center gap-4 py-4">
                 {["00", time.h, time.m, time.s].map((val, idx) => (
                    <div key={idx} className="bg-red-600 text-white w-16 h-16 md:w-20 md:h-20 rounded-md flex flex-col items-center justify-center shadow-lg">
                       <span className="text-2xl md:text-3xl font-bold">{val}</span>
                       <span className="text-[10px] md:text-xs uppercase">{["Days", "Hours", "Minutes", "Seconds"][idx]}</span>
                    </div>
                 ))}
              </div>

              <button onClick={handleScrollToOrder} className="bg-green-700 hover:bg-green-800 text-white text-xl font-bold py-3 px-10 rounded flex items-center justify-center gap-2 mx-auto shadow-xl transition-transform hover:scale-105">
                 <ShoppingCart /> অর্ডার করতে চাই
              </button>
           </div>
        </div>
      </section>

      {/* --- SECTION 3: USAGE (Green) --- */}
      <section className="bg-[#005c29] py-12 text-white">
        <div className="container mx-auto px-4 text-center">
           <div className="border-2 border-yellow-400 p-4 inline-block rounded mb-8 bg-green-800">
              <h2 className="text-2xl md:text-4xl font-bold">সেবন বিধি</h2>
              <p className="mt-2 text-lg">প্রতি রাতে খাবার পরে এক চা-চামচ পাউডার হাফ গ্লাস কুসুম গরম পানির সাথে মিশিয়ে খাবেন।</p>
           </div>
           
           <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-6">
              <div className="bg-white p-2 rounded max-w-xs text-black">
                 <Image src="/s1.png" alt="Bottle" width={300} height={400} className="rounded"/>
              </div>
              <div className="bg-white p-2 rounded max-w-sm">
                 <Image src="/s2.webp" alt="Diagram" width={400} height={400} className="rounded"/>
              </div>
           </div>

           <button onClick={handleScrollToOrder} className="mt-10 bg-green-600 border-2 border-white hover:bg-green-700 text-white text-xl font-bold py-3 px-12 rounded shadow-xl inline-flex items-center gap-2">
              <ShoppingCart /> অর্ডার করতে চাই
           </button>
        </div>
      </section>

      {/* --- SECTION 4: BENEFITS (Red) --- */}
      <section className="bg-[#4a0404] py-12 text-white">
         <div className="container mx-auto px-4">
            <div className="border-2 border-green-500 rounded p-4 text-center mb-10 max-w-3xl mx-auto bg-[#005c29]">
               <h2 className="text-2xl font-bold">অর্গানিক ফুড এর উপকারিতা -</h2>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
               <ul className="space-y-4 text-lg md:text-xl font-medium">
                  {[
                     "যৌবন উত্তেজনা ও স্বাস্থ্য উন্নত করে",
                     "পুরুষত্ব ফিরিয়ে দেয়",
                     "ঘুমের মান উন্নত করে",
                     "মিলনের সময় বাড়ায় ২৫-৩০ মিনিট পর্যন্ত",
                     "পেটের গ্যাস ও অজীর্ণতা দূর করে",
                     "রাতে ২-৩ বার সহবাস করতে পারবেন",
                     "ক্ষুধা বাড়ায় ও সময় ধরে রাখতে সহায়তা করে",
                     "যৌনশক্তি ভেতর থেকে জাগ্রত করে",
                     "দেহের রোগপ্রতিরোধ ক্ষমতা বাড়ায়"
                  ].map((item, i) => (
                     <li key={i} className="flex items-start gap-3">
                        <span className="text-2xl">👉</span> {item}
                     </li>
                  ))}
               </ul>
               <div className="bg-white p-2 rounded">
                  <Image src="/s2.webp" alt="Diagram" width={400} height={400} className="rounded"/>
               </div>
            </div>
            
            <div className="text-center mt-10">
               <button onClick={handleScrollToOrder} className="bg-yellow-400 hover:bg-yellow-500 text-black text-xl font-bold py-3 px-12 rounded shadow-xl inline-flex items-center gap-2">
                  <ShoppingCart /> অর্ডার করতে চাই
               </button>
            </div>
         </div>
      </section>

      {/* --- SECTION 5: WHY US (Light) --- */}
      <section className="bg-[#fff5f5] py-12">
         <div className="container mx-auto px-4">
            <div className="bg-[#008037] text-white text-center py-3 rounded max-w-2xl mx-auto mb-10 shadow-lg">
               <h2 className="text-2xl font-bold">আমাদের থেকেই কেন অর্ডার করবেন?</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8 justify-center items-start max-w-5xl mx-auto">
               <ul className="space-y-6 text-gray-800 font-medium flex-1">
                  <li className="flex gap-3">
                     <CheckCircle className="text-green-600 shrink-0" />
                     <span>এটি বাংলাদেশ সায়েন্সল্যাব পরীক্ষিত এবং অনুমোদিত।</span>
                  </li>
                  <li className="flex gap-3">
                     <CheckCircle className="text-green-600 shrink-0" />
                     <span>আমাদের প্রোডাক্ট টি শতভাগ কেমিক্যাল মুক্ত প্রাকৃতিক প্রোডাক্ট।</span>
                  </li>
                  <li className="flex gap-3">
                     <CheckCircle className="text-green-600 shrink-0" />
                     <span>আমরা কাস্টমার থেকে অগ্রিম কোনো পেমেন্ট নেইনা, আপনি প্রোডাক্ট হাতে পাওয়ার পর চেক করে পেমেন্ট করবেন।</span>
                  </li>
                  <li className="flex gap-3">
                     <CheckCircle className="text-green-600 shrink-0" />
                     <span>আমরা রোগ নিরাময়ে কোনো গ্যারান্টি দেইনা, কারণ মানুষের সুস্থতা একমাত্র আল্লাহর হাতে, আমরা শুধু চেষ্টা করবো।</span>
                  </li>
                  <li className="flex gap-3">
                     <CheckCircle className="text-green-600 shrink-0" />
                     <span>আমাদের আছে রিফান্ড পলিসি: আপনি যদি ৭৫% প্রোডাক্ট সেবন করার পর ও রেজাল্ট না পান, তাহলে অবশিষ্ট ২৫% প্রোডাক্ট ফেরত দিয়ে ৬০% টাকা রিফান্ড নিতে পারবেন।</span>
                  </li>
                  <li className="flex gap-3">
                     <CheckCircle className="text-green-600 shrink-0" />
                     <span>তবে ইনশাআল্লাহ আমাদের দীর্ঘ ৫ বছরের অভিজ্ঞতা থেকে বলতে পারি, অনেকের মত আপনিও ভালো একটি রেজাল্ট পাবেন ইনশাআল্লাহ।</span>
                  </li>
               </ul>
               
               <div className="flex-1 border-4 border-gray-300 p-2 bg-white w-full md:w-auto">
                  <Image src="/cer1.jpg" alt="Certificate" width={400} height={500} className="w-full object-contain"/>
               </div>
            </div>

            <div className="text-center mt-10">
               <button onClick={handleScrollToOrder} className="bg-green-700 hover:bg-green-800 text-white text-2xl font-bold py-3 px-12 rounded shadow-xl inline-flex items-center gap-2">
                  <ShoppingCart /> ফুল কোর্স অর্ডার করতে চাই
               </button>
            </div>
         </div>
      </section>

      {/* --- SECTION 6: INGREDIENTS (Green) --- */}
      <section className="bg-[#008037] py-12 text-white text-center">
  <div className="container mx-auto px-4">
    {/* Title Section */}
    <div className="border border-yellow-400 inline-block px-8 py-2 rounded mb-8 bg-[#006b2e]">
      <h2 className="text-2xl font-bold">কি কি উপাদানে তৈরি "অর্গানিক ফুড"</h2>
    </div>

    {/* Ingredients Grid (6 items) */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {[
        { name: "পেস্তাবাদাম ও চিনাবাদাম", img: "/up1.webp" },
        { name: "মধু ও জাফরান", img: "/up2.webp" },
        { name: "হরীতকী ও খেজুর", img: "/up3.jpg" },
        { name: "কাজুবাদাম ও কাঠবাদাম", img: "/up4.jpg" },
        { name: "আখরোট ও জিনসিন", img: "/up5.jpeg" },
        { name: "কালোজিরা ও অন্যান্য", img: "/up6.jpeg" }
      ].map((item, idx) => (
        <div key={idx} className="bg-white text-black p-4 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 transition duration-300">
          {/* Image Container */}
          <div className="h-32 w-full relative mb-3">
             {/* Note: Make sure images exist in public folder */}
             <Image 
               src={item.img} 
               alt={item.name} 
               fill 
               className="object-contain"
             />
          </div>
        </div>
      ))}
    </div>

    {/* CTA Section */}
    <div className="mt-10">
      <p className="text-xl font-bold mb-4 text-yellow-200">প্রয়োজনে কল করুন বা কল করতে নিচের বাটনে ক্লিক করুন</p>
      <a href="tel:01346448977" className="bg-yellow-400 text-black font-extrabold text-2xl md:text-3xl py-3 px-10 rounded-full inline-flex items-center gap-3 shadow-xl hover:bg-yellow-500 hover:scale-110 transition">
        <Phone fill="black" size={28} /> 01346448977
      </a>
      <p className="mt-4 text-xl font-medium animate-pulse text-red-300">এই অফার খুব সীমিত সময়ের জন্য</p>
    </div>
  </div>
</section>

      {/* --- SECTION 7: REVIEWS --- */}
      <section className="bg-[#fffde7] py-12">
         <div className="container mx-auto px-4 text-center">
            <div className="bg-[#008037] text-white py-3 rounded max-w-2xl mx-auto mb-10">
               <h2 className="text-2xl font-bold">সম্মানিত কাস্টমারদের রিভিউ।</h2>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
                  <Image src="/m1.png" alt="Review 1" width={500} height={600} />
       
                  <Image src="/m2.png" alt="Review 2" width={500} height={600}  />
            </div>

            <button onClick={handleScrollToOrder} className="bg-green-600 hover:bg-green-700 text-white text-2xl font-bold py-3 px-12 rounded shadow-xl inline-flex items-center gap-2">
               <ShoppingCart /> ফুল কোর্স অর্ডার করতে চাই
            </button>
         </div>
      </section>

      {/* --- SECTION 8: FINAL CTA (Green) --- */}
      <section className="bg-[#008037] py-16 text-white text-center">
         <div className="border border-yellow-400 max-w-4xl mx-auto p-8 rounded-lg relative">
            <h2 className="text-3xl font-bold mb-6">এখনই কথা বলুন বিশেষজ্ঞদের সঙ্গে!</h2>
            <ul className="list-disc list-inside space-y-2 mb-6 inline-block text-left text-lg">
               <li>পণ্য হাতে পেয়ে কোয়ালিটি যাচাই করে নিতে পারবেন।</li>
               <li>অগ্রিম কোন টাকা দিতে হবে না পণ্য হাতে পেয়ে টাকা দিবেন।</li>
               <li>আমরা সারা দেশে দ্রুত সময়ে হোম ডেলিভারি দিয়ে থাকি</li>
            </ul>

            <div className="flex justify-center gap-4 mb-6">
               {["00", "00", "00", "00"].map((t, i) => (
                  <div key={i} className="bg-red-600 text-white w-16 h-16 rounded flex flex-col items-center justify-center font-bold">
                     <span className="text-xl">{t}</span>
                     <span className="text-[10px]">TIME</span>
                  </div>
               ))}
            </div>
            
            <a href="tel:01346448977" className="bg-yellow-400 text-black text-3xl font-extrabold py-3 px-10 rounded shadow-lg inline-flex items-center gap-2">
               <Phone fill="black" /> 01346448977
            </a>
            <p className="mt-4 font-bold text-black opacity-60">এই অফার খুব সীমিত সময়ের জন্য</p>
         </div>
      </section>

      {/* --- SECTION 9: ORDER FORM (Main Functionality) --- */}
      <section id="order-section" className="py-12 bg-white">
         <div className="container mx-auto px-4 max-w-4xl border-2 border-gray-300 rounded-lg p-0 overflow-hidden shadow-2xl">
            <div className="bg-[#008037] text-white text-center py-4">
               <h2 className="text-2xl font-bold">অর্ডারটি কনফার্ম করতে আপনার নাম নাম্বার ঠিকানা দিন</h2>
            </div>
            
            <div className="p-6 md:p-10 bg-[#f9f9f9]">
               <div className="text-center mb-6">
                  <span className="text-gray-700 text-lg">২-৩ দিনের মধ্যে ফলাফল অবশ্যই মিলবে</span>
                  <span className="inline-block border-2 border-red-500 rounded-full px-2 ml-2 text-red-500 font-bold rotate-12">মিলবে</span>
               </div>

               {/* Product Selection Row */}
               <div className="bg-gray-100 p-4 rounded border mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                     <div className="bg-white p-1 rounded border">
                        <Image src="/k.jpg" alt="p" width={60} height={60} />
                     </div>
                     <div>
                        <h4 className="font-bold">Organic food × {quantity}</h4>
                        <p className="text-sm text-gray-500">Unit Price: {PRODUCT_PRICE} Tk</p>
                     </div>
                  </div>
                  
                  {/* Quantity Increment/Decrement */}
                  <div className="flex items-center border border-gray-300 bg-white rounded">
                     <button onClick={decreaseQty} type="button" className="p-2 hover:bg-gray-100 text-gray-600"><Minus size={16}/></button>
                     <span className="px-4 font-bold">{quantity}</span>
                     <button onClick={increaseQty} type="button" className="p-2 hover:bg-gray-100 text-gray-600"><Plus size={16}/></button>
                  </div>

                  <div className="font-bold text-lg">{quantity * PRODUCT_PRICE} ৳</div>
               </div>

               <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                  {/* Left: Billing Form */}
                  <div className="space-y-4">
                     <h3 className="font-bold text-gray-800 border-b pb-2">Billing details</h3>
                     
                     <div>
                        <label className="block text-sm mb-1 font-bold">আপনার নাম <span className="text-red-500">*</span></label>
                        <input 
                           type="text" 
                           required
                           placeholder="আপনার নাম"
                           className="w-full border p-3 rounded focus:outline-green-500"
                           value={formData.name}
                           onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                     </div>
                     <div>
                        <label className="block text-sm mb-1 font-bold">আপনার সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span></label>
                        <input 
                           type="text" 
                           required
                           placeholder="জেলা, থানা, গ্রাম/ এলাকার নাম"
                           className="w-full border p-3 rounded focus:outline-green-500"
                           value={formData.address}
                           onChange={e => setFormData({...formData, address: e.target.value})}
                        />
                     </div>
                     <div>
                        <label className="block text-sm mb-1 font-bold">আপনার ফোন নাম্বার <span className="text-red-500">*</span></label>
                        <input 
                           type="tel" 
                           required
                           placeholder="আপনার ফোন নাম্বার"
                           className="w-full border p-3 rounded focus:outline-green-500"
                           value={formData.phone}
                           onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                     </div>
                     
                     <div className="pt-2">
                        <label className="block text-sm mb-1 font-bold">Shipping</label>
                        <div className="border p-3 rounded bg-white flex justify-between">
                           <span>Free shipping</span>
                           <input type="radio" checked readOnly className="accent-green-600"/>
                        </div>
                     </div>
                  </div>

                  {/* Right: Order Summary */}
                  <div className="bg-white p-4 rounded border h-fit">
                     <h3 className="font-bold text-gray-800 mb-4">Your order</h3>
                     
                     <div className="flex justify-between text-sm mb-2 border-b pb-2">
                        <span className="font-bold">Product</span>
                        <span className="font-bold">Subtotal</span>
                     </div>
                     
                     <div className="flex justify-between text-sm mb-2">
                        <span>Organic food × {quantity}</span>
                        <span>{quantity * PRODUCT_PRICE} ৳</span>
                     </div>
                     
                     <div className="flex justify-between text-sm mb-2 border-b pb-2">
                        <span>Subtotal</span>
                        <span>{quantity * PRODUCT_PRICE} ৳</span>
                     </div>

                     <div className="flex justify-between font-bold text-lg mb-4 text-green-700">
                        <span>Total</span>
                        <span>{quantity * PRODUCT_PRICE} ৳</span>
                     </div>

                     <div className="text-xs text-gray-500 mb-4">
                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#" className="text-red-500">privacy policy</a>.
                     </div>

                     <button 
                        disabled={isSubmitting}
                        type="submit" 
                        className={`w-full text-white font-bold py-4 rounded flex items-center justify-center gap-2 shadow-lg transition ${isSubmitting ? 'bg-gray-400' : 'bg-[#f1592a] hover:bg-[#d94a20]'}`}
                     >
                        {isSubmitting ? "অর্ডার প্রসেস হচ্ছে..." : (
                           <>
                              <Lock size={18} /> অর্ডার কনফার্ম করুন {quantity * PRODUCT_PRICE} ৳
                           </>
                        )}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </section>
      
      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-600 bg-white border-t">
         <div className="flex justify-center items-center gap-2 mb-2">
            <Lock size={14} className="text-green-600"/>
            <span className="font-bold text-green-800">৫ দিনের মানি ব্যাক গ্যারান্টি | তথ্য গোপনীয় থাকবে | ক্যাশ অন ডেলিভারি</span>
         </div>
         <p>Copyright © 2026 Lajim-Vai</p>
      </footer>

    </main>
  );
}