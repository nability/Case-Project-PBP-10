const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM Dosen', (error, results) => {
        if (error) {
            console.error('Error fetching Dosen:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

router.get('/:nidn', (req, res) => {
    const DosenId = req.params.nidn;
    db.query('SELECT * FROM Dosen WHERE nidn = ?', [DosenId], (error, results) => {
        if (error) {
            console.error('Error fetching Dosen:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Dosen not found' });
        } else {
            res.json(results[0]);
        }
    });
});

router.put('/:nidn', (req, res) => {
    const DosenId = req.params.nidn;
    const { nama, gender, prodi, alamat } = req.body;
    db.query(
        'UPDATE Dosen SET nama = ?, gender = ?, prodi = ?, alamat = ? WHERE nidn = ?',
        [nama, gender, prodi, alamat, DosenId],
        (error) => {
            if (error) {
                console.error('Error updating Dosen:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.json({ message: 'Dosen updated successfully' });
            }
        }
    );
});

router.post('/', (req, res) => {
    const { nidn, nama, gender, prodi, alamat } = req.body;
    db.query(
        'INSERT INTO Dosen (nidn, nama, gender, prodi, alamat) VALUES (?, ?, ?, ?, ?)',
        [nidn, nama, gender, prodi, alamat],
        (error) => {
            if (error) {
                console.error('Error adding Dosen:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.status(201).json({ message: 'Dosen added successfully' });
            }
        }
    );
});

router.delete('/:nidn', (req, res) => {
    const DosenId = req.params.nidn;
    db.query('DELETE FROM Dosen WHERE nidn = ?', [DosenId], (error) => {
        if (error) {
            console.error('Error deleting Dosen:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ message: 'Dosen deleted successfully' });
        }
    });
});

module.exports = router;