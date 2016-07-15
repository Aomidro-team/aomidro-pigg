import React from 'react';
import { Link } from 'react-router';

const Index = () =>
  <div className="p-index">
    <div className="p-index__box">
      <p className="p-index__title">AomidroPigg</p>
      <p className="p-index__beta">Beta (ロゴがほしい…)</p>
      <Link className="p-index__link" to="/entrance">はじめる</Link>
    </div>
  </div>;

export default Index;
