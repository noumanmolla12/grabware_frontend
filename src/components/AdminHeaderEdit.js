

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaPhoneAlt, FaEdit } from 'react-icons/fa';
// import { fetchHeaders, editHeader } from '../features/common/headerSlice';
// import useHasMounted from '../hooks/useHasMounted';

// const Header = () => {
//   const [language, setLanguage] = useState('en');
//   const [editField, setEditField] = useState(null);
//   const [editValue, setEditValue] = useState('');
//   const [hoveredField, setHoveredField] = useState(null);
//   const dispatch = useDispatch();
//   const hasMounted = useHasMounted();

//   const { headers, status } = useSelector((state) => state.headers);

//   useEffect(() => {
//     if (language) {
//       dispatch(fetchHeaders(language));
//     }
//   }, [dispatch, language]);

//   if (!hasMounted || status !== 'succeeded' || !headers || headers.length === 0) {
//     return <div style={{ textAlign: 'center', padding: '10px' }}>Failed to load header.</div>;
//   }

//   const {
//     _id,
//     company_name,
//     phone,
//     facebook,
//     instagram,
//     twitter,
//     youtube,
//     logo,
//   } = headers[0];

//   const formatUrl = (url) =>
//     url?.startsWith('http://') || url?.startsWith('https://')
//       ? url
//       : url
//       ? `https://${url}`
//       : '#';

//   const openEditModal = (field, value) => {
//     setEditField(field);
//     setEditValue(value || '');
//   };

//   const handleSave = () => {
//     if (editField && _id) {
//       if (editField === 'logo') {
//         const formData = new FormData();
//         formData.append('logo', editValue);
//         dispatch(editHeader({ id: _id, headerData: formData }));
//       } else {
//         dispatch(
//           editHeader({
//             id: _id,
//             headerData: { [editField]: editValue },
//           })
//         );
//       }
//     }
//     setEditField(null);
//     setEditValue('');
//   };

//   // 👇 reusable editable field
//   const EditableField = ({ field, value, children }) => (
//     <div
//       style={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}
//       onMouseEnter={() => setHoveredField(field)}
//       onMouseLeave={() => setHoveredField(null)}
//     >
//       {children}
//       {hoveredField === field && (
//         <FaEdit
//           style={{ cursor: 'pointer', color: 'gray', marginLeft: '5px' }}
//           onClick={() => openEditModal(field, value)}
//         />
//       )}
//     </div>
//   );

//   return (
//     <div>
//       {/* ===== BLUR WRAPPER ===== */}
//       <div style={{ filter: editField ? 'blur(5px)' : 'none', pointerEvents: editField ? 'none' : 'auto' }}>
//         {/* Tricolor Bar */}
//         <img
//           src="https://www.mea.gov.in/images/web-flag-strip-bg.jpg"
//           alt="Top Banner"
//           style={{ width: '100%', height: 'auto', display: 'block' }}
//         />

//         {/* Top Header */}
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             padding: '2px 20px',
//             height: '50px',
//             borderBottom: '1px solid #ccc',
//             background: 'white',
//             fontFamily: 'Arial, sans-serif',
//           }}
//         >
//           {/* Left: Punjabi + Company */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <span
//               style={{
//                 fontSize: '12px',
//                 fontWeight: 100,
//                 color: '#0066cc',
//                 fontFamily: `'Noto Sans Gurmukhi','GurbaniAkhar','Segoe UI',sans-serif`,
//                 letterSpacing: '1px',
//               }}
//             >
//               ਨਗਰ ਨਿਗਮ ਕਪੂਰਥਲਾ
//             </span>
//             <div style={{ borderLeft: '1px dotted #696d70ff', height: '25px' }} />
//             <EditableField field="company_name" value={company_name}>
//               <span style={{ color: '#0066cc', fontWeight: 'bold' }}>{company_name}</span>
//             </EditableField>
//           </div>

//           {/* Right: Phone + Socials + Language */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <div style={{ borderLeft: '1px dotted #696d70ff', height: '25px' }} />
//             <EditableField field="phone" value={phone}>
//               <span
//                 style={{ color: '#0066cc', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
//               >
//                 <FaPhoneAlt style={{ color: 'blue', fontSize: '18px' }} />
//                 {phone}
//               </span>
//             </EditableField>
//             <div style={{ borderLeft: '1px dotted #696d70ff', height: '25px' }} />

//             {/* Social Icons */}
//             <EditableField field="facebook" value={facebook}>
//               <a href={formatUrl(facebook)} target="_blank" rel="noopener noreferrer">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
//                   alt="Facebook"
//                   width="24"
//                   height="24"
//                 />
//               </a>
//             </EditableField>

//             <EditableField field="twitter" value={twitter}>
//               <a href={formatUrl(twitter)} target="_blank" rel="noopener noreferrer">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
//                   alt="Twitter"
//                   width="24"
//                   height="24"
//                 />
//               </a>
//             </EditableField>

//             <EditableField field="youtube" value={youtube}>
//               <a href={formatUrl(youtube)} target="_blank" rel="noopener noreferrer">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
//                   alt="YouTube"
//                   width="24"
//                   height="24"
//                 />
//               </a>
//             </EditableField>

//             <EditableField field="instagram" value={instagram}>
//               <a href={formatUrl(instagram)} target="_blank" rel="noopener noreferrer">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
//                   alt="Instagram"
//                   width="24"
//                   height="24"
//                 />
//               </a>
//             </EditableField>

//             <div style={{ borderLeft: '1px dotted #696d70ff', height: '25px' }} />

//             {/* Language Dropdown */}
//             <div style={{ padding: '10px' }}>
//               <select
//                 value={language}
//                 onChange={(e) => setLanguage(e.target.value)}
//                 style={{
//                   padding: '6px',
//                   fontWeight: 'bold',
//                   fontSize: '16px',
//                   border: '2px solid black',
//                   borderRadius: '5px',
//                   cursor: 'pointer',
//                 }}
//               >
//                 <option value="en">English</option>
//                 <option value="hi">Hindi</option>
//                 <option value="pa">Punjabi</option>
//                 <option value="ur">Urdu</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Middle Logos */}
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             padding: '10px 20px',
//             background: 'white',
//           }}
//         >
//           <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
//             <img
//               src="https://img.favpng.com/10/17/8/sarnath-lion-capital-of-ashoka-pillars-of-ashoka-state-emblem-of-india-national-symbols-of-india-png-favpng-hKC4k4exDfrvDwuq7QisEcTFJ.jpg"
//               alt="Municipal Logo"
//               style={{ height: '60px' }}
//             />
//             <EditableField field="logo" value={logo}>
//               <img
//                 src={`http://localhost:5000/uploads/${logo}`}
//                 alt="Company Logo"
//                 style={{
//                   width: '60px',
//                   height: '60px',
//                   objectFit: 'cover',
//                   borderRadius: '50%',
//                   border: '2px solid #2c2b2bff',
//                 }}
//               />
//             </EditableField>
//           </div>
//           <img
//             src="https://mckapurthala.com/public/views/kapurthala/img/flag.gif"
//             alt="Indian Flag"
//             style={{ height: '40px' }}
//           />
//           <img
//             src="https://mckapurthala.com/public/views/kapurthala/img/swachh-bharatlogo.png"
//             alt="Swachh Bharat"
//             style={{ height: '60px' }}
//           />
//         </div>

//         {/* Navigation Bar */}
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             backgroundColor: '#004c99',
//             padding: '10px 0',
//           }}
//         >
//           {[
//             'Home',
//             'About Us',
//             'Dedicated Team',
//             'Departments',
//             'Tenders',
//             'AMRUT Reforms',
//             'Photo Gallery',
//             'News',
//             'Accounts',
//           ].map((item, index) => (
//             <a
//               key={index}
//               href="#"
//               style={{
//                 color: 'white',
//                 margin: '0 15px',
//                 fontWeight: 'bold',
//                 textDecoration: 'none',
//                 fontSize: '16px',
//               }}
//             >
//               {item}
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* ===== EDIT MODAL ===== */}
//       {editField && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 9999,
//           }}
//         >
//           <div
//             style={{
//               background: 'white',
//               padding: '20px',
//               borderRadius: '10px',
//               minWidth: '300px',
//               textAlign: 'center',
//             }}
//           >
//             <h3>Edit {editField}</h3>
//             {editField === 'logo' ? (
//               <input type="file" onChange={(e) => setEditValue(e.target.files[0])} />
//             ) : (
//               <input
//                 type="text"
//                 value={editValue}
//                 onChange={(e) => setEditValue(e.target.value)}
//                 style={{ padding: '8px', width: '100%', margin: '10px 0' }}
//               />
//             )}
//             <div
//               style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}
//             >
//               <button
//                 onClick={handleSave}
//                 style={{ padding: '8px 12px', background: 'green', color: 'white' }}
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setEditField(null)}
//                 style={{ padding: '8px 12px', background: 'red', color: 'white' }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;



'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPhoneAlt, FaEdit } from 'react-icons/fa';
import { fetchHeaders, editHeader } from '../features/common/headerSlice';
import useHasMounted from '../hooks/useHasMounted';
import UserNavbar from './UserNavbar';

const Header = () => {
  const [language, setLanguage] = useState('en');
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [hoveredField, setHoveredField] = useState(null);
  const dispatch = useDispatch();
  const hasMounted = useHasMounted();

  const { headers, status } = useSelector((state) => state.headers);

  useEffect(() => {
    if (language) {
      dispatch(fetchHeaders(language));
    }
  }, [dispatch, language]);

  if (!hasMounted || status !== 'succeeded' || !headers || headers.length === 0) {
    return <div style={{ textAlign: 'center', padding: '10px' }}>Failed to load header.</div>;
  }

  const {
    _id,
    company_name,
    phone,
    facebook,
    instagram,
    twitter,
    youtube,
    logo,
  } = headers[0];

  const formatUrl = (url) =>
    url?.startsWith('http://') || url?.startsWith('https://')
      ? url
      : url
      ? `https://${url}`
      : '#';

  const openEditModal = (field, value) => {
    setEditField(field);
    setEditValue(value || '');
  };

  const handleSave = () => {
    if (editField && _id) {
      if (editField === 'logo') {
        const formData = new FormData();
        formData.append('logo', editValue);
        dispatch(editHeader({ id: _id, headerData: formData }));
      } else {
        dispatch(
          editHeader({
            id: _id,
            headerData: { [editField]: editValue },
          })
        );
      }
    }
    setEditField(null);
    setEditValue('');
  };

  // 👇 reusable editable field
  const EditableField = ({ field, value, children }) => (
    <div
      style={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}
      onMouseEnter={() => setHoveredField(field)}
      onMouseLeave={() => setHoveredField(null)}
    >
      {children}
      {hoveredField === field && (
        <FaEdit
          style={{ cursor: 'pointer', color: 'gray', marginLeft: '5px' }}
          onClick={() => openEditModal(field, value)}
        />
      )}
    </div>
  );

  return (
    <div>
      {/* ===== BLUR WRAPPER ===== */}
      <div style={{ filter: editField ? 'blur(5px)' : 'none', pointerEvents: editField ? 'none' : 'auto' }}>
        {/* Tricolor Bar */}
        <img
          src="https://www.mea.gov.in/images/web-flag-strip-bg.jpg"
          alt="Top Banner"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2px 20px',
            height: '50px',
            borderBottom: '1px solid #ccc',
            background: 'white',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          {/* Left: Punjabi + Company */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 100,
                color: '#0066cc',
                fontFamily: `'Noto Sans Gurmukhi','GurbaniAkhar','Segoe UI',sans-serif`,
                letterSpacing: '1px',
              }}
            >
              ਨਗਰ ਨਿਗਮ ਕਪੂਰਥਲਾ
            </span>
            <div style={{ borderLeft: '1px dotted #696d70ff', height: '25px' }} />
            <EditableField field="company_name" value={company_name}>
              <span style={{ color: '#0066cc', fontWeight: 'bold' }}>{company_name}</span>
            </EditableField>
          </div>

          {/* Right: Phone + Socials + Language */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ borderLeft: '1px dotted #696d70ff', height: '25px' }} />
            <EditableField field="phone" value={phone}>
              <span
                style={{ color: '#0066cc', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <FaPhoneAlt style={{ color: 'blue', fontSize: '18px' }} />
                {phone}
              </span>
            </EditableField>
            <div style={{ borderLeft: '1px dotted #696d70ff', height: '25px' }} />

            {/* Social Icons */}
            <EditableField field="facebook" value={facebook}>
              <a href={formatUrl(facebook)} target="_blank" rel="noopener noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="Facebook"
                  width="24"
                  height="24"
                />
              </a>
            </EditableField>

            <EditableField field="twitter" value={twitter}>
              <a href={formatUrl(twitter)} target="_blank" rel="noopener noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                  alt="Twitter"
                  width="24"
                  height="24"
                />
              </a>
            </EditableField>

            <EditableField field="youtube" value={youtube}>
              <a href={formatUrl(youtube)} target="_blank" rel="noopener noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                  alt="YouTube"
                  width="24"
                  height="24"
                />
              </a>
            </EditableField>

            <EditableField field="instagram" value={instagram}>
              <a href={formatUrl(instagram)} target="_blank" rel="noopener noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt="Instagram"
                  width="24"
                  height="24"
                />
              </a>
            </EditableField>

            <div style={{ borderLeft: '1px dotted #696d70ff', height: '25px' }} />

            {/* Language Dropdown */}
            <div style={{ padding: '10px' }}>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  padding: '6px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  border: '2px solid black',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="pa">Punjabi</option>
                <option value="ur">Urdu</option>
              </select>
            </div>
          </div>
        </div>

        {/* Middle Logos */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            background: 'white',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img
              src="https://img.favpng.com/10/17/8/sarnath-lion-capital-of-ashoka-pillars-of-ashoka-state-emblem-of-india-national-symbols-of-india-png-favpng-hKC4k4exDfrvDwuq7QisEcTFJ.jpg"
              alt="Municipal Logo"
              style={{ height: '60px' }}
            />
            <EditableField field="logo" value={logo}>
              <img
                // src={`http://localhost:5000/uploads/${logo}`}
                src={`https://grabware.onrender.com/uploads/${logo}`}
                
                alt="Company Logo"
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '2px solid #2c2b2bff',
                }}
              />
            </EditableField>
          </div>
          <img
            src="https://mckapurthala.com/public/views/kapurthala/img/flag.gif"
            alt="Indian Flag"
            style={{ height: '40px' }}
          />
          <img
            src="https://mckapurthala.com/public/views/kapurthala/img/swachh-bharatlogo.png"
            alt="Swachh Bharat"
            style={{ height: '60px' }}
          />
        </div>

        {/* Navigation Bar */}
        <UserNavbar/>
        {/* <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#004c99',
            padding: '10px 0',
          }}
        >
          {[
            'Home',
            'About Us',
            'Dedicated Team',
            'Departments',
            'Tenders',
            'AMRUT Reforms',
            'Photo Gallery',
            'News',
            'Accounts',
          ].map((item, index) => (
            <a
              key={index}
              href="#"
              style={{
                color: 'white',
                margin: '0 15px',
                fontWeight: 'bold',
                textDecoration: 'none',
                fontSize: '16px',
              }}
            >
              {item}
            </a>
          ))}
        </div> */}
      </div>

      {/* ===== EDIT MODAL ===== */}
      {editField && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              minWidth: '300px',
              textAlign: 'center',
            }}
          >
            <h3>Edit {editField}</h3>
            {editField === 'logo' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                {/* Existing Logo */}
                <div>
                  <p style={{ marginBottom: '5px' }}>Existing Logo:</p>
                  <img
                    // src={`http://localhost:5000/uploads/${logo}`}
                    src={`https://grabware.onrender.com/uploads/${logo}`}
                    
                    alt="Existing Logo"
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
                  />
                </div>

                {/* New Logo Preview */}
                {editValue instanceof File && (
                  <div>
                    <p style={{ marginBottom: '5px' }}>New Logo Preview:</p>
                    <img
                      src={URL.createObjectURL(editValue)}
                      alt="New Logo Preview"
                      style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                  </div>
                )}

                <input type="file" onChange={(e) => setEditValue(e.target.files[0])} />
              </div>
            ) : (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                style={{ padding: '8px', width: '100%', margin: '10px 0' }}
              />
            )}
            <div
              style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}
            >
              <button
                onClick={handleSave}
                style={{ padding: '8px 12px', background: 'green', color: 'white' }}
              >
                Save
              </button>
              <button
                onClick={() => setEditField(null)}
                style={{ padding: '8px 12px', background: 'red', color: 'white' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
