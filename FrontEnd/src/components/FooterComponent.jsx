import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const FooterComponent = () => {
  return (
    <footer className='bg-light'>
      <Container className="d-flex flex-column py-3 ">
        <Link style={{ textDecoration: 'none' }} className="text-body" to="/">
          <h3>The Parentings</h3>
        </Link>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5">
          <div className="coll mt-3">
            <h4 className="mb-3">Kehamilan</h4>
            <p className="mb-2">Tips Kehamilan</p>
            <p className="mb-2">Melahirkan</p>
            <p className="mb-2">Menyusui</p>
          </div>
          <div className="coll mt-3">
            <h4 className="mb-3">Kesehatan</h4>
            <p className="mb-2">Info Kesehatan</p>
            <p className="mb-2">Kebugaran</p>
            <p className="mb-2">Vaksinasi</p>
          </div>
          <div className="coll mt-3">
            <h4 className="mb-3">Tumbuh Kembang</h4>
            <p className="mb-2">Bayi</p>
            <p className="mb-2">Balita</p>
            <p className="mb-2">Prasekolah</p>
            <p className="mb-2">Praremaja</p>
            <p className="mb-2">Usia Sekolah</p>
          </div>
          <div className="coll mt-3">
            <h4 className="mb-3">Parenting</h4>
            <p className="mb-2">Pernikahan</p>
            <p className="mb-2">Keluarga</p>
          </div>
          <div className="coll mt-3">
            <h4 className="mb-3">Makanan & Nutrisi</h4>
            <p className="mb-2">Makanan Sehat</p>
            <p className="mb-2">Minuman Sehat</p>
          </div>
        </div>
        <p className="text-center pt-2 border-top border-secondary">© Copyright 2022, Hak cipta oleh blog parenting </p>
      </Container>
    </footer>
  );
};

export default FooterComponent;
