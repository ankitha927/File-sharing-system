import React from 'react';
import QRCode from 'qrcode.react';

const Qrcode = ({ items }) => {
  return (
    <div>
      {items.map(item => (
        <div key={item.id} style={{ width:'30px', border: '5px solid #ccc', padding: '10px', margin: '10px' }}>
          <p>ID: {item.id}</p>
          <p>URL: <a href={item.url}>{item.url}</a></p>
          <p>Name: {item.name}</p>
          <QRCode value={item.url} />
        </div>
      ))}
    </div>
  );
};

export default Qrcode;
