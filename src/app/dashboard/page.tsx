"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const analysisDescriptions = {
  'descriptive': 'Summarizes and describes the main features of a dataset, including measures of central tendency and variability.',
  't-test': 'Compares the means of two groups to determine if they are significantly different from each other.',
  'one-way-anova': 'Analyzes the difference in means between three or more independent groups.',
  'two-way-anova': 'Examines the influence of two different categorical independent variables on one continuous dependent variable.',
  'correlation': 'Measures the strength and direction of the relationship between two variables.',
  'regression': 'Estimates the relationship between a dependent variable and one or more independent variables.',
  'chi-square': 'Tests the independence of two categorical variables or goodness of fit.',
  'factor-analysis': 'Reduces a large number of variables into fewer numbers of factors.',
  'cluster-analysis': 'Groups similar objects into clusters, revealing underlying patterns in data.',
  'time-series': 'Analyzes data points collected over time to identify trends, cycles, and seasonal patterns.',
  'pca': 'Reduces the dimensionality of large datasets while preserving as much variability as possible.',
  'discriminant-analysis': 'Predicts group membership based on a set of continuous independent variables.',
  'survival-analysis': 'Analyzes the expected duration of time until an event occurs.',
  'multivariate-anova': 'Analyzes the effect of one or more independent variables on multiple dependent variables simultaneously.'
};

const DataAnalysisApp = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [analysisType, setAnalysisType] = useState('');
  const [additionalParams, setAdditionalParams] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && (uploadedFile.type === 'application/pdf' || uploadedFile.type.includes('excel'))) {
      setFile(uploadedFile);
      setError('');
    } else {
      setError('Please upload a valid Excel or PDF file.');
    }
  };

  const handleAnalysisTypeChange = (event) => {
    setAnalysisType(event.target.value);
    setAdditionalParams({});
  };

  const handleParamChange = (param, value) => {
    setAdditionalParams(prev => ({ ...prev, [param]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please upload a file before submitting.');
      return;
    }
    if (!analysisType) {
      setError('Please select an analysis type before submitting.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('analysisType', analysisType);
    formData.append('additionalParams', JSON.stringify(additionalParams));

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis request failed');
      }

      const data = await response.json();
      router.push(`/results/${data.analysisId}`);
    } catch (error) {
      console.error('Error during analysis:', error);
      setError('An error occurred during the analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderAdditionalParams = () => {
    switch (analysisType) {
      case 'one-way-anova':
      case 'two-way-anova':
        return (
          <>
            <input
              type="text"
              placeholder="Dependent Variable"
              onChange={(e) => handleParamChange('dependentVar', e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Independent Variable(s) (comma-separated)"
              onChange={(e) => handleParamChange('independentVars', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </>
        );
      case 't-test':
        return (
          <>
            <select
              onChange={(e) => handleParamChange('testType', e.target.value)}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select T-Test Type</option>
              <option value="independent">Independent Samples</option>
              <option value="paired">Paired Samples</option>
              <option value="one-sample">One Sample</option>
            </select>
            <input
              type="text"
              placeholder="Variable(s) (comma-separated)"
              onChange={(e) => handleParamChange('variables', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </>
        );
      case 'correlation':
      case 'regression':
        return (
          <>
            <input
              type="text"
              placeholder="Dependent Variable"
              onChange={(e) => handleParamChange('dependentVar', e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Independent Variable(s) (comma-separated)"
              onChange={(e) => handleParamChange('independentVars', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </>
        );
      default:
        return (
          <input
            type="text"
            placeholder="Variables to analyze (comma-separated)"
            onChange={(e) => handleParamChange('variables', e.target.value)}
            className="w-full p-2 border rounded"
          />
        );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Data Analysis App</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Upload File (Excel or PDF)</label>
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".xlsx,.xls,.pdf"
            className="w-full p-2 border rounded"
          />
        </div>
        {file && (
          <div className="mb-4">
            <p>Selected file: {file.name}</p>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-red-500 hover:text-red-700"
            >
              Remove file
            </button>
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-2">Select Analysis Type</label>
          <select
            value={analysisType}
            onChange={handleAnalysisTypeChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select an analysis type</option>
            {Object.keys(analysisDescriptions).map((type) => (
              <option key={type} value={type}>
                {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>
        {analysisType && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Analysis Description:</h3>
            <p className="text-sm text-gray-600 mb-4">{analysisDescriptions[analysisType]}</p>
            <label className="block mb-2">Additional Parameters</label>
            {renderAdditionalParams()}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Analyzing...' : 'Analyze Data'}
        </button>
      </form>
      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default DataAnalysisApp;