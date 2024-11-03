import React, { useState, useEffect } from "react";
import axios from "axios";

export const Team = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/team", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // ถ้าคุณเก็บ token ใน local storage
          }
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching team data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>ทีมพวกเรา</h2>
          <p>
            สมาชิกในทีมและตำแหน่ง
          </p>
        </div>
        <div id="row">
          {loading
            ? "loading"
            : data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
                  <div className="thumbnail">
                    <img src={d.img} alt="..." className="team-img" />
                    <div className="caption">
                      <h4>{d.name}</h4>
                      <p>{d.job}</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};