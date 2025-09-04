"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "@/features/event/eventSlice";
import {
  deleteImportantLink,
  getAllImportantLinks,
} from "@/features/implink/implinkSlice";
import { useRouter } from "next/navigation";
import { fetchNotifications } from "@/features/notification/notificationSlice";
import { FaFilePdf } from "react-icons/fa";

export default function HomePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Important Links
  const { links } = useSelector((state) => state.implink);
  useEffect(() => {
    dispatch(getAllImportantLinks());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (typeof window !== "undefined") {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this link?"
      );
      if (confirmDelete) {
        dispatch(deleteImportantLink(id));
      }
    }
  };

  // Events
  const { events, loading: eventsLoading } = useSelector(
    (state) => state.event
  );
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  // Notifications
  const { items, loading: notificationsLoading } = useSelector(
    (state) => state.notifications
  );
  const [filter, setFilter] = useState("All");
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const filteredItems = items.filter((n) => {
    if (filter === "All") return true;
    if (filter === "Archive") {
      return n.validUpto && new Date(n.validUpto) < new Date();
    }
    return n.category === filter;
  });

  const categories = [
    "RECRUITMENT",
    "NEWS",
    "EVENTS",
    "PRESS RELEASE",
    "Office Order",
    "Circular",
    "Tender",
  ];



  return (
    <>
      <section className="container my-5" style={{ height: "550px" }}>
        <div className="row h-100 g-0">
          {/* Left Column */}
          <div className="col-lg-2 col-md-12 d-flex flex-column justify-content-between h-100 px-2">
            {/* Mayor Card */}
            <div
              className="shadow rounded border d-flex flex-column align-items-center p-2 mb-3 flex-fill"
              style={{ borderColor: "#e0e0e0" }}
            >
              <img
                src="https://mckapurthala.com/public/views/kapurthala/images/mayor.png"
                alt="Mayor"
                className="img-fluid rounded"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  border: "4px solid #e6f0fa",
                  padding: "4px",
                }}
              />
              <div className="text-center mt-2">
                <p className="mb-1 fw-semibold" style={{ fontSize: "14px" }}>
                  SHRI RAJA IQBAL SINGH
                </p>
                <p
                  className="text-primary fw-bold mb-0"
                  style={{ fontSize: "13px" }}
                >
                  MAYOR
                </p>
              </div>
            </div>

            {/* Commissioner Card */}
            <div
              className="shadow rounded border d-flex flex-column align-items-center p-2 flex-fill"
              style={{ borderColor: "#e0e0e0" }}
            >
              <img
                src="https://mckapurthala.com/public/views/kapurthala/images/commissioner.png"
                alt="Commissioner"
                className="img-fluid rounded"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  border: "4px solid #e6f0fa",
                  padding: "4px",
                }}
              />
              <div className="text-center mt-2">
                <p className="mb-1 fw-semibold" style={{ fontSize: "14px" }}>
                  SHRI ASHWANI KUMAR, IAS
                </p>
                <p
                  className="text-primary fw-bold mb-0"
                  style={{ fontSize: "13px" }}
                >
                  COMMISSIONER
                </p>
              </div>
            </div>
          </div>

          {/* Center Column */}
          <div className="col-lg-8 col-md-12 d-flex justify-content-center align-items-center px-2 h-100">
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
              {events
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 1)
                .map((event) => (
                  <div key={event._id} className="w-100 h-100 p-2">
                    <div className="ratio ratio-16x9 w-100 h-100">
                      <img
                        // 
                        src={`https://grabware.onrender.com/uploads/events/${event.image}`}
                        
                        alt={event.event_name}
                        className="img-fluid rounded shadow"
                        style={{
                          objectFit: "cover",
                          borderRadius: "12px",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-2 col-md-12 d-flex flex-column justify-content-between h-100 px-2">
            <div
              className="border rounded shadow-sm overflow-hidden flex-fill d-flex flex-column"
              style={{ backgroundColor: "#f7f9fc" }}
            >
              <div
                className="d-flex align-items-center px-2 py-2"
                style={{ backgroundColor: "#ffa726" }}
              >
                <i
                  className="bi bi-megaphone-fill me-2"
                  style={{ fontSize: "1.2rem" }}
                ></i>
                <h6 className="mb-0 fw-bold" style={{ fontSize: "1rem" }}>
                  Updates
                </h6>
              </div>
              <ul
                className="list-unstyled m-0 p-2 flex-grow-1"
                style={{ fontSize: "0.9rem", overflowY: "auto" }}
              >
                {[...Array(6)].map((_, i) => (
                  <li key={i} className="mb-2">
                    <span className="text-danger me-1">•</span>
                    Desilting of drain (more than 4 ft)...{" "}
                    <span
                      className="badge bg-warning text-dark ms-1"
                      style={{ fontSize: "0.7rem" }}
                    >
                      NEW
                    </span>
                    <hr
                      className="my-2"
                      style={{ borderTop: "1px dotted #999" }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid my-5 px-1">
        {/* Header */}
        <div
          style={{
            backgroundColor: "#0b3e91",
            color: "white",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
            Important Updates and Tender:
          </div>

          {/* Scrolling Ticker */}
          <div
            style={{
              marginLeft: "20px",
              flex: 1,
              overflow: "hidden",
              backgroundColor: "#fff", // 👈 White background
              borderRadius: "4px",
              padding: "5px 0",
            }}
          >
            <ul
              style={{
                display: "flex",
                listStyle: "none",
                padding: 0,
                margin: 0,
                animation: "scroll-left 25s linear infinite",
                color: "#0b3e91", // 👈 Dark blue text for contrast
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              <li style={{ padding: "0 40px", whiteSpace: "nowrap" }}>
                Please Pay your Property Tax till 31-08-2025 for year 2025-2026
              </li>
              <li style={{ padding: "0 40px", whiteSpace: "nowrap" }}>
                To Download the Application form for the post of Sewarman &
                Safai Sewak on contract basis (D.C rates) in Municipal
                Corporation Kapurthala
              </li>
              <li style={{ padding: "0 40px", whiteSpace: "nowrap" }}>
                Street Light Complaints: Call at 1800 180 3580 for any Street
                Light Complaints
              </li>
              <li style={{ padding: "0 40px", whiteSpace: "nowrap" }}>
                To Download the Application form for the post of Sewarman &
                Safai Sewak on contract basis (D.C rates) in Municipal
                Corporation Kapurthala
              </li>
            </ul>
          </div>
        </div>

        {/* Inline Keyframe Animation */}
        <style>
          {`
      @keyframes scroll-left {
        0% {
          transform: translateX(100%);
        }
        100% {
          transform: translateX(-100%);
        }
      }
    `}
        </style>
      </section>

      <section
        className="container-fluid my-5 px-1"
        style={{
          fontFamily: "Arial, sans-serif",
          display: "flex",
          backgroundImage:
            "url('https://edistrict.delhigovt.nic.in/assets/images/pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >
        {/* Content Area */}

        
        <div
          className="col-6"
          style={{
            flex: 1,
            backgroundColor: "#004b93",
            color: "white",
            padding: "20px",
            borderRadius: "5px",
            marginRight: "20px",
          }}
        >
          <h2 style={{ fontWeight: "bold" }}>About Us</h2>
          <img
            src="https://mckapurthala.com/public/views/kapurthala/img/aboutus.jpg"
            alt="Kapurthala Building"
            style={{ width: "100%", marginTop: "15px", borderRadius: "4px" }}
          />
          <br />
          <br />
          <p>
            Kapurthala is situated in Doaba region at confluence of river Beas
            and Sutluj. It is the one of the earlier princely state. Maharaja
            Jagatjit Singh the last ruler of Kapurthala before independence, was
            a great enthusiast of French architecture, which is reflected from
            the palaces and various monuments of the city. It is known as ‘Paris
            of Punjab. Kapurthala, as any other place in Punjab has been a land
            of Kings and has rich cultural and historical importance and
            significance. Structures and monuments of grandeur and beauty have
            been built in Kapurthala that add charm and visual delight to the
            place...
          </p>

          <button
            style={{
              marginTop: "15px",
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            Read More
          </button>
        </div>

        {/* Recruitment Section */}
       <div
      className="col-6"
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
        background: "#fafafa",
      }}
    >
      {/* 🔹 Three Buttons (All, Archive, Dropdown) */}
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <button
          onClick={() => setFilter("All")}
          style={{
            backgroundColor: filter === "All" ? "#2563eb" : "#004b93",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          All
        </button>

        <button
          onClick={() => setFilter("Archive")}
          style={{
            backgroundColor: filter === "Archive" ? "#2563eb" : "#004b93",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Archive
        </button>

        <select
          value={categories.includes(filter) ? filter : ""}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: "500",
            flex: "1",
            cursor: "pointer",
          }}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Info */}
      <div
        style={{
          color: "#8a4a00",
          fontWeight: "bold",
          marginBottom: "12px",
          fontSize: "14px",
        }}
      >
        📌 PDF Document maximum size limit is{" "}
        <span style={{ color: "red" }}>2 MB</span>.
      </div>

      {/* 🔹 List Style Notifications */}
      <div>
        <ul
          style={{ paddingLeft: "18px", lineHeight: "1.8", fontSize: "14px" }}
        >
          {filteredItems.map((n) => (
  <li key={n._id}>
    <strong style={{ fontWeight: "600" }}>{n.title}</strong>{" "}
    {n.details}{" "}
    {n.pdf && (
      <a
        // href={`http://localhost:5000/uploads/notifications/${n.pdf}`}
        href={`https://grabware.onrender.com/uploads/notifications/${n.pdf}`}
        
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#004b93",
          fontWeight: "500",
          marginLeft: "5px",
        }}
      >
        <FaFilePdf
          style={{
            color: "red",
            fontSize: "18px",
            display: "inline",
            marginRight: "4px",
          }}
        />
        (pdf)
      </a>
    )}
    {n.photo && (
      <img
        // src={`http://localhost:5000/uploads/notifications/${n.photo}`}
        src={`https://grabware.onrender.com/uploads/notifications/${n.photo}`}
        
        alt=""
        style={{
          width: "100px",
          height: "60px",
          objectFit: "cover",
          borderRadius: "4px",
          display: "block",
          marginTop: "5px",
        }}
      />
    )}
  </li>
))}

          {filteredItems.length === 0 && (
            <li style={{ color: "gray" }}>No notifications found.</li>
          )}
        </ul>
      </div>
    </div>
      </section>

      <section
        style={{
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          padding: "30px",
        }}
      >
        {/* SERVICES SECTION */}
        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              margin: "40px 0",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "5%",
                right: "5%",
                height: "1px",
                backgroundColor: "#3f51b5",
                zIndex: 0,
              }}
            ></div>

            <div
              style={{
                padding: "8px 30px",
                backgroundColor: "#3f51b5",
                borderRadius: "8px",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
                zIndex: 1,
              }}
            >
              Services
            </div>
          </div>

          <>
      <style>
        {`
          .service-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            justify-items: center;
          }

          @media (max-width: 1024px) {
            .service-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 600px) {
            .service-grid {
              grid-template-columns: 1fr;
            }
          }

          .service-card {
            background-color: #f4f2f9;
            padding: 15px 10px;
            width: 250px;
            display: flex;
            align-items: center;
            gap: 15px;
            border: 1px solid #eee;
            border-radius: 6px;
          }

          .icon-circle {
            background-color: #2c58b3;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .icon-circle img {
            width: 71px;
            height: 74px;
            object-fit: contain;
          }

          .service-label {
            text-align: left;
            font-size: 14px;
          }
        `}
      </style>

      <div className="service-grid">
        {/* 1 */}
        <div className="service-card">
          <div className="icon-circle">
            <img src="https://mckapurthala.com/public/views/kapurthala/img/icon_property.png" alt="Property Tax" />
          </div>
          <div className="service-label">Property Tax</div>
        </div>

        {/* 2 */}
        <div className="service-card">
          <div className="icon-circle">
            <img src="https://mckapurthala.com/public/views/kapurthala/img/icon_water.png" alt="Water Supply" />
          </div>
          <div className="service-label">Water Supply</div>
        </div>

        {/* 3 */}
        <div className="service-card">
          <div className="icon-circle">
            <img src="https://mckapurthala.com/public/views/kapurthala/img/icon_sewer.png" alt="Sewerage Bill" />
          </div>
          <div className="service-label">Sewerage Bill</div>
        </div>

        {/* 4 */}
        <div className="service-card">
          <div className="icon-circle">
            <img src="https://mckapurthala.com/public/views/kapurthala/img/icon_streetv.png" alt="Street Vending" />
          </div>
          <div className="service-label">Street Vending</div>
        </div>

        {/* 5 */}
        <div className="service-card">
          <div className="icon-circle">
            <img src="https://mckapurthala.com/public/views/kapurthala/img/icon_plane.png" alt="Tourism" />
          </div>
          <div className="service-label">Tourism</div>
        </div>

        {/* 6 */}
        <div className="service-card">
          <div className="icon-circle">
            <img src="https://mckapurthala.com/public/views/kapurthala/img/icon_trade.png" alt="Trade Licence" />
          </div>
          <div className="service-label">Trade Licence</div>
        </div>

        {/* 7 */}
        <div className="service-card">
          <div className="icon-circle">
            <img src="https://mckapurthala.com/public/views/kapurthala/img/icon_certificate.png" alt="Fire NOC" />
          </div>
          <div className="service-label">Fire NOC</div>
        </div>

        {/* 8 */}
        <div className="service-card">
          <div className="icon-circle">
            <img src="https://mckapurthala.com/public/views/kapurthala/img/icon_street.png" alt="Street Light Complaints" />
          </div>
          <div className="service-label">Street Light Complaints (Call At 1800 180 3580)</div>
        </div>
      </div>
    </>
        </div>
        {/* IMPORTANT LINKS SECTION */}
        <div style={{ marginTop: "60px" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              margin: "40px 0",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "5%",
                right: "5%",
                height: "1px",
                backgroundColor: "#3f51b5",
                zIndex: 0,
              }}
            ></div>

            <div
              style={{
                padding: "8px 30px",
                backgroundColor: "#3f51b5",
                borderRadius: "8px",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
                zIndex: 1,
              }}
            >
              Important Links
            </div>
          </div>

          <div>
      <h2>Important Links</h2>

     

      {/* Grid View of Clickable Images */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {links.map((link) => (
          <a
            key={link._id}
            href={link.link_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            <img
              // src={`http://localhost:5000/uploads/implinks/${link.image}`}
              src={`https://grabware.onrender.com/uploads/implinks/${link.image}`}
              
              alt={link.link_name}
              style={{
                width: "120px",
                height: "auto",
                border: "1px solid #ccc",
                padding: "5px",
                backgroundColor: "white",
              }}
            />
          </a>
        ))}
      </div>
    </div>

        </div>
      </section>

      <section style={{ textAlign: "center", padding: "20px" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            margin: "40px 0",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "5%",
              right: "5%",
              height: "1px",
              backgroundColor: "#3f51b5",
              zIndex: 0,
            }}
          ></div>

          <div
            style={{
              padding: "8px 30px",
              backgroundColor: "#3f51b5",
              borderRadius: "8px",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              zIndex: 1,
            }}
          >
            Get Connected With Us
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {/* Facebook */}
          <div
            style={{
              border: "2px solid #2d66d3",
              borderRadius: "10px",
              padding: "10px",
              width: "270px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#2d66d3",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              <i
                className="fab fa-facebook-square"
                style={{ fontSize: "30px", marginRight: "5px" }}
              ></i>
              @off.MCK
            </div>

            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FMunicipalCorporationKapurthala%2F&tabs=timeline&width=270&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="250"
              height="300"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen={true}
            ></iframe>

            <button
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                backgroundColor: "#2d66d3",
                color: "white",
                fontWeight: "bold",
                borderRadius: "5px",
                border: "none",
                fontSize: "16px",
              }}
              onClick={() =>
                window.open(
                  "https://www.facebook.com/MunicipalCorporationKapurthala/",
                  "_blank",
                )
              }
            >
              <i
                className="fab fa-facebook-square"
                style={{ marginRight: "8px" }}
              ></i>
              Follow us
            </button>
          </div>

          {/* Instagram */}
          <div
            style={{
              border: "2px solid #f7b928",
              borderRadius: "10px",
              padding: "10px",
              width: "270px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#f7b928",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              <i
                className="fab fa-instagram"
                style={{ fontSize: "30px", marginRight: "5px" }}
              ></i>
              @off.MCK
            </div>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/people/Municipal-Corporation-Kapurthala/100069646918427/&tabs=timeline&width=270&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="270"
              height="300"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
            <button
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                backgroundColor: "#f7b928",
                color: "white",
                fontWeight: "bold",
                borderRadius: "5px",
                border: "none",
                fontSize: "16px",
              }}
            >
              <i
                className="fab fa-instagram"
                style={{ marginRight: "8px" }}
              ></i>
              Follow us
            </button>
          </div>
          {/* Twitter */}
          <div
            style={{
              border: "2px solid #1da1f2",
              borderRadius: "10px",
              padding: "10px",
              width: "270px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#1da1f2",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              <i
                className="fab fa-twitter"
                style={{ fontSize: "30px", marginRight: "5px" }}
              ></i>
              @off.MCK
            </div>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/people/Municipal-Corporation-Kapurthala/100069646918427/&tabs=timeline&width=270&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="270"
              height="300"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
            <button
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                backgroundColor: "#1da1f2",
                color: "white",
                fontWeight: "bold",
                borderRadius: "5px",
                border: "none",
                fontSize: "16px",
              }}
            >
              <i className="fab fa-twitter" style={{ marginRight: "8px" }}></i>
              Follow us
            </button>
          </div>
          {/* YouTube */}
          <div
            style={{
              border: "2px solid #ff0000",
              borderRadius: "10px",
              padding: "10px",
              width: "270px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#ff0000",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              <i
                className="fab fa-youtube"
                style={{ fontSize: "30px", marginRight: "5px" }}
              ></i>
              @off.MCK
            </div>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/people/Municipal-Corporation-Kapurthala/100069646918427/&tabs=timeline&width=270&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="270"
              height="300"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
            <button
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                backgroundColor: "#ff0000",
                color: "white",
                fontWeight: "bold",
                borderRadius: "5px",
                border: "none",
                fontSize: "16px",
              }}
            >
              <i className="fab fa-youtube" style={{ marginRight: "8px" }}></i>
              Follow us
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
