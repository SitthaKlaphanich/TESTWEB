import React, { useEffect, useState } from "react";
import axios from "axios"; 

export const Testimonials = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/client");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching client:", error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>รีวิวจาก ลูกค้า</h2>
        </div>
        <div className="row">
          {loading
            ? "loading"
            : data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  <div className="testimonial">
                    <div className="testimonial-image">
                      <img src={d.img} alt={d.name} />
                    </div>
                    <div className="testimonial-content">
                      <p>"{d.text}"</p>
                      <div className="testimonial-meta"> - {d.name} </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};