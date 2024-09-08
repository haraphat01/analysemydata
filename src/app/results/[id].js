// pages/results/[id].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function AnalysisResults() {
  const router = useRouter();
  const { id } = router.query;
  const [analysis, setAnalysis] = useState('');
  const [analysisType, setAnalysisType] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`/analyses/${id}.json`)
        .then(response => response.json())
        .then(data => {
          setAnalysis(data.analysis);
          setAnalysisType(data.analysisType);
        })
        .catch(error => console.error('Error fetching analysis:', error));
    }
  }, [id]);

  const handleEditorChange = (content) => {
    setAnalysis(content);
  };

  const handleDownload = (format) => {
    let content = analysis;
    let mimeType = 'text/plain';
    let fileExtension = 'txt';

    if (format === 'docx') {
      // For simplicity, we're just downloading as plain text
      // In a real application, you'd use a library like docx to generate a proper DOCX file
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      fileExtension = 'docx';
    } else if (format === 'pdf') {
      // Similarly, for PDF you'd use a library like pdfmake
      mimeType = 'application/pdf';
      fileExtension = 'pdf';
    }

    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `analysis_report.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Analysis Results: {analysisType}</h1>
      <ReactQuill value={analysis} onChange={handleEditorChange} />
      <div className="mt-4">
        <button onClick={() => handleDownload('txt')} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
          Download as TXT
        </button>
        <button onClick={() => handleDownload('docx')} className="mr-2 px-4 py-2 bg-green-500 text-white rounded">
          Download as DOCX
        </button>
        <button onClick={() => handleDownload('pdf')} className="px-4 py-2 bg-red-500 text-white rounded">
          Download as PDF
        </button>
      </div>
    </div>
  );
}