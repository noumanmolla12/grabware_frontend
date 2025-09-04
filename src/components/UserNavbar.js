// 'use client';

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchNavbars } from "../features/common/navbarSlice";

// // Recursive tree builder with "visible" check
// const buildTree = (items, parentId = null) => {
//   return items
//     .filter(
//       (item) =>
//         item.visible === true && String(item.parentId || "") === String(parentId || "")
//     )
//     .map((item) => ({
//       ...item,
//       children: buildTree(items, item._id),
//     }));
// };

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const { items } = useSelector((state) => state.navbars);

//   useEffect(() => {
//     dispatch(fetchNavbars());
//   }, [dispatch]);

//   // Recursive renderer
//   const renderLinks = (nodes) => (
//     <ul>
//       {nodes.map((link) => (
//         <li key={link._id}>
//           <a href={link.url} target="_blank" rel="noopener noreferrer">
//             {link.title}
//           </a>
//           {link.children?.length > 0 && renderLinks(link.children)}
//         </li>
//       ))}
//     </ul>
//   );

//   // Build tree (only visible)
//   const tree = buildTree(items);

//   return <nav>{renderLinks(tree)}</nav>;
// };

// export default Navbar;










'use client';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNavbars } from "../features/common/navbarSlice";

// Recursive tree builder with "visible" check
const buildTree = (items, parentId = null) => {
  return items
    .filter(
      (item) =>
        item.visible === true && String(item.parentId || "") === String(parentId || "")
    )
    .map((item) => ({
      ...item,
      children: buildTree(items, item._id),
    }));
};

const Navbar = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.navbars);

  useEffect(() => {
    dispatch(fetchNavbars());
  }, [dispatch]);

  const tree = buildTree(items);

  const renderLinks = (nodes) => (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex' }}>
      {nodes.map((link) => (
        <li
          key={link._id}
          style={{
            position: 'relative',
            margin: '0 20px',
            cursor: 'pointer',
          }}
        >
          <a
            href={link.url}
            style={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              padding: '5px 10px',
              borderRadius: '4px',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0066cc')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {link.title}
          </a>

          {/* Nested children overlay */}
          {link.children?.length > 0 && (
            <ul
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: '#004c99',
                padding: '10px 0',
                minWidth: '200px',
                display: 'none',
                flexDirection: 'column',
                zIndex: 9999,
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
              className="dropdown"
            >
              {link.children.map((child) => (
                <li key={child._id} style={{ padding: '5px 20px', cursor: 'pointer' }}>
                  <a
                    href={child.url}
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                      fontWeight: 'normal',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      display: 'block',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0066cc')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {child.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );

  // Hover effect for dropdown
  useEffect(() => {
    const items = document.querySelectorAll('li[style*="position: relative"]');
    items.forEach((li) => {
      li.addEventListener('mouseenter', () => {
        const dropdown = li.querySelector('.dropdown');
        if (dropdown) dropdown.style.display = 'flex';
      });
      li.addEventListener('mouseleave', () => {
        const dropdown = li.querySelector('.dropdown');
        if (dropdown) dropdown.style.display = 'none';
      });
    });
  }, [tree]);

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#004c99',
        padding: '10px 0',
      }}
    >
      {renderLinks(tree)}
    </nav>
  );
};

export default Navbar;
