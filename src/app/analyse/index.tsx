import React, { useState } from 'react';
import { Upload, FileIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DataAnalysisApp = () => {
  const [file, setFile] = useState(null);
  const [analysisType, setAnalysisType] = useState('');
  const [additionalParams, setAdditionalParams] = useState({});
  const [error, setError] = useState('');

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
    // Reset additional parameters when analysis type changes
    setAdditionalParams({});
  };

  const handleParamChange = (param, value) => {
    setAdditionalParams(prev => ({ ...prev, [param]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please upload a file before submitting.');
      return;
    }
    if (!analysisType) {
      setError('Please select an analysis type before submitting.');
      return;
    }
    // TODO: Implement file upload and analysis logic
    console.log('File:', file);
    console.log('Analysis Type:', analysisType);
    console.log('Additional Parameters:', additionalParams);
  };

  const renderAdditionalParams = () => {
    switch (analysisType) {
      case 'one-way-anova':
        return (
          <Input
            type="text"
            placeholder="Factor name"
            onChange={(e) => handleParamChange('factor', e.target.value)}
          />
        );
      case 'two-way-anova':
        return (
          <>
            <Input
              type="text"
              placeholder="Factor 1 name"
              onChange={(e) => handleParamChange('factor1', e.target.value)}
            />
            <Input
              type="text"
              placeholder="Factor 2 name"
              onChange={(e) => handleParamChange('factor2', e.target.value)}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Data Analysis App</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload File (Excel or PDF)</label>
              <div className="mt-1 flex items-center">
                <label className="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400 focus:outline-none">
                  <input type="file" className="sr-only" onChange={handleFileUpload} accept=".xlsx,.xls,.pdf" />
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <span>Upload a file</span>
                    </div>
                  </div>
                </label>
              </div>
              {file && (
                <div className="mt-2 flex items-center">
                  <FileIcon className="h-5 w-5 text-gray-400" />
                  <span className="ml-2">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Analysis Type</label>
              <Select
                value={analysisType}
                onChange={handleAnalysisTypeChange}
                className="mt-1"
              >
                <option value="">Select an analysis type</option>
                <option value="one-way-anova">One-way ANOVA</option>
                <option value="two-way-anova">Two-way ANOVA</option>
              </Select>
            </div>
            {analysisType && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Additional Parameters</label>
                {renderAdditionalParams()}
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">Analyze Data</Button>
      </CardFooter>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </Card>
  );
};

export default DataAnalysisApp;