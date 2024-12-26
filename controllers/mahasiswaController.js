const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET /mahasiwa
router.get('/mahasiwa', (req, res) => {
    db.query('SELECT * FROM mahasiwa', (error, results) => {
        if (error) {
            console.error('Error fetching mahasiwa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

// GET /mahasiwa/:nim
router.get('/mahasiwa/:nim', (req, res) => {
    const mahasiswaId = req.params.nim;
    db.query('SELECT * FROM mahasiwa WHERE nim = ?', [mahasiswaId], (error, results) => {
        if (error) {
            console.error('Error fetching mahasiwa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Mahasiwa not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// PUT /mahasiwa/:nim
router.put('/:nim', (req, res) => {
    const mahasiwaNim = req.params.nim;
    const { nama, gender, prodi, alamat } = req.body;
    db.query(
        'UPDATE mahasiwa SET nama = ?, gender = ?, prodi = ?, alamat = ? WHERE nim = ?',
        [nama, gender, prodi, alamat, mahasiwaNim],
        (error) => {
            if (error) {
                console.error('Error updating mahasiswa:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.json({ message: 'Mahasiswa updated successfully' });
            }
        }
    );
});

router.post('/', (req, res) => {
    const { nim, nama, gender, prodi, alamat } = req.body;
    db.query(
        'INSERT INTO mahasiwa (nim, nama, gender, prodi, alamat) VALUES (?, ?, ?, ?, ?)',
        [nim, nama, gender, prodi, alamat],
        (error) => {
            if (error) {
                console.error('Error adding mahasiswa:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.status(201).json({ message: 'Mahasiswa added successfully' });
            }
        }
    );
});

router.delete('/:nim', (req, res) => {
    const mahasiwaNim = req.params.nim;
    db.query('DELETE FROM mahasiwa WHERE nim = ?', [mahasiwaNim], (error) => {
        if (error) {
            console.error('Error deleting mahasiswa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ message: 'Mahasiswa deleted successfully' });
        }
    });
});

module.exports = router;
