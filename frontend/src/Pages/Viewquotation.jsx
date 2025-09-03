import React from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Link } from 'react-router-dom';

const Viewquotation = () => {
    // 🔹 Replace dynamic data with static mock data
    const data = {
        quotation_number: "QTN-1001",
        quotation_date: "2024-08-25",
        status: "Approved",
        event: {
            name: "Annual Corporate Gala",
            description: "Corporate event for employees and partners.",
            location: "Grand Hotel, Mumbai",
            event_date: "2024-09-10"
        },
        client: {
            name: "Rahul Sharma",
            email: "rahul@example.com",
            phone: "+91 9876543210",
            city: "Mumbai"
        },
        quotation_details: [
            { id: 1, sub_category: { name: "Stage Setup" }, quantity: 1, amount: 5000, total: 5000 },
            { id: 2, sub_category: { name: "Catering" }, quantity: 100, amount: 800, total: 80000 },
            { id: 3, sub_category: { name: "Sound System" }, quantity: 1, amount: 10000, total: 10000 },
        ],
        subtotal: 95000,
        notes: "Please confirm at least 7 days before event."
    };

    // ✅ Same PDF generator (no changes needed)
    const downloadQuotation = () => {
        const doc = new jsPDF();

        doc.setTextColor(44, 62, 80);
        doc.setFontSize(24);
        doc.text("Quotation", 14, 20);

        doc.setFillColor(52, 152, 219);
        doc.rect(14, 25, 180, 8, 'F');
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text(`Quotation Number: ${data.quotation_number}`, 16, 30);
        doc.text(`Quotation Date: ${data.quotation_date}`, 80, 30);
        doc.text(`Status: ${data.status}`, 150, 30);

        doc.setFontSize(18);
        doc.setTextColor(44, 62, 80);
        doc.text("Event Details", 14, 45);

        doc.setFillColor(230, 230, 250);
        doc.rect(14, 50, 180, 20, 'F');
        doc.setFontSize(12);
        doc.setTextColor(44, 62, 80);
        doc.text(`Event Name: ${data.event.name}`, 16, 56);
        doc.text(`Description: ${data.event.description}`, 16, 62);
        doc.text(`Location: ${data.event.location}`, 16, 68);
        doc.text(`Date: ${data.event.event_date}`, 16, 74);

        doc.setFontSize(18);
        doc.setTextColor(44, 62, 80);
        doc.text("Client Information", 14, 85);

        doc.setFillColor(240, 255, 240);
        doc.rect(14, 90, 180, 20, 'F');
        doc.setFontSize(12);
        doc.setTextColor(44, 62, 80);
        doc.text(`Name: ${data.client.name}`, 16, 96);
        doc.text(`Email: ${data.client.email}`, 16, 102);
        doc.text(`Phone: ${data.client.phone}`, 16, 108);
        doc.text(`City: ${data.client.city}`, 16, 114);

        autoTable(doc, {
            startY: 125,
            head: [['Item', 'Quantity', 'Unit Price', 'Total']],
            body: data.quotation_details.map((item) => [
                item.sub_category.name,
                item.quantity,
                item.amount,
                item.total,
            ]),
            theme: 'grid',
            headStyles: { fillColor: [39, 174, 96], textColor: 255 },
            bodyStyles: { fillColor: [245, 245, 245] },
            alternateRowStyles: { fillColor: [255, 255, 255] },
            styles: { cellPadding: 4, fontSize: 10, textColor: [44, 62, 80] },
            columnStyles: { 0: { cellWidth: 70 }, 1: { cellWidth: 30 }, 2: { cellWidth: 30 }, 3: { cellWidth: 30 } },
        });

        const finalY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(12);
        doc.setTextColor(44, 62, 80);
        doc.setFillColor(189, 195, 199);
        doc.rect(14, finalY, 180, 8, 'F');
        doc.text(`Subtotal: ${data.subtotal}`, 16, finalY + 5);

        if (data.notes) {
            doc.text(`Notes: ${data.notes}`, 14, finalY + 15);
        }

        doc.save(`Quotation_${data.quotation_number}.pdf`);
    };

    return (
        <div className="container-fluid p-0 quotation-detail-page">
            <div className="dashboard-page">
                <div className="page__full-wrapper">
                    <Sidebar />
                    <div className="page__body-wrapper">
                        <Header />
                        <div className="app__slide-wrapper">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="breadcrumb__wrapper mb-35">
                                        <div className="breadcrumb__inner">
                                            <div className="breadcrumb__icon">
                                                <i className="flaticon-home"></i>
                                            </div>
                                            <div className="breadcrumb__menu">
                                                <nav>
                                                    <ul>
                                                        <li>
                                                            <span><Link to="/dashboard">Home</Link></span>
                                                        </li>
                                                        <li className="active"><span>Quotation</span></li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="attendant__list-area pb-20 px-4">
                                <div className="attendan__content">
                                    <div className="body__card-wrapper">
                                        <div className="attendant__wrapper">
                                            <h1 className="mb-4">{data.event.name}</h1>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <p><strong>Event Description:</strong> {data.event.description}</p>
                                                <p><strong>Location:</strong> {data.event.location}</p>
                                                <p><strong>Event Date:</strong> {data.event.event_date}</p>
                                                <p><strong>Status:</strong> <span className={`status-badge ${data.status.toLowerCase()}`}>{data.status}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Client Details */}
                            <div className="attendant__list-area pb-20 px-4">
                                <div className="attendan__content">
                                    <div className="body__card-wrapper">
                                        <div className="attendant__wrapper">
                                            <h1>Client Information</h1>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <p><strong>Name:</strong> {data.client.name}</p>
                                                <p><strong>Email:</strong> {data.client.email}</p>
                                                <p><strong>Phone:</strong> {data.client.phone}</p>
                                                <p><strong>City:</strong> {data.client.city}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quotation Table */}
                            <div className="attendant__list-area pb-20 px-4">
                                <div className="attendan__content">
                                    <div className="body__card-wrapper">
                                        <div className="attendant__wrapper">
                                            <h1>Quotation Details</h1>
                                        </div>
                                        <table className="quotation-table">
                                            <thead>
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Quantity</th>
                                                    <th>Unit Price</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.quotation_details.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.sub_category.name}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.total}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Download Button */}
                            <div className="row">
                                <div className="col-xl-12 text-right ps-5">
                                    <button onClick={downloadQuotation} className="btn btn-primary mt-2">
                                        Download Quotation
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Viewquotation;
