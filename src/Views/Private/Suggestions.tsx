import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getAllDocuments } from '../../firebase/firestore/firestoreService';

interface Suggestion {
  component: string;
  version: string;
  suggestion: string;
}

interface ComponentSuggestions {
  component: string;
  version: string;
  suggestions: string[];
}

// Type guard to check if an object is of type Suggestion
const isSuggestion = (doc: any): doc is Suggestion => {
  return (
    typeof doc.component === 'string' &&
    typeof doc.version === 'string' &&
    typeof doc.suggestion === 'string'
  );
};

// Function to compare semantic version strings in descending order
const compareVersionsDesc = (a: string, b: string): number => {
  const aParts = a.split('.').map(Number);
  const bParts = b.split('.').map(Number);
  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aVal = aParts[i] || 0;
    const bVal = bParts[i] || 0;
    if (aVal !== bVal) {
      return bVal - aVal; // Sort in descending order
    }
  }
  return 0;
};

const SuggestionsTable: React.FC = () => {
  const [data, setData] = useState<ComponentSuggestions[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documents = await getAllDocuments('suggestions');
        if (documents) {
          const suggestionsMap: Record<string, ComponentSuggestions> = {};

          documents.forEach((doc: { id: string; [key: string]: any }) => {
            if (isSuggestion(doc)) {
              const { component, version, suggestion } = doc;
              const key = `${component}-${version}`;

              if (!suggestionsMap[key]) {
                suggestionsMap[key] = {
                  component,
                  version,
                  suggestions: [],
                };
              }
              suggestionsMap[key].suggestions.push(suggestion);
            } else {
              console.warn('Document does not match the Suggestion format:', doc);
            }
          });

          // Convert map to array and apply sorting
          const sortedData = Object.values(suggestionsMap).sort((a, b) => {
            // Sort by component name (A-Z)
            if (a.component < b.component) return -1;
            if (a.component > b.component) return 1;

            // Sort by version (DESC)
            return compareVersionsDesc(a.version, b.version);
          });

          setData(sortedData);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Component Suggestions</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Component</th>
            <th>Version</th>
            <th>Suggestions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.component}</td>
              <td>{item.version}</td>
              <td>
                <ul>
                  {item.suggestions.map((suggestion, idx) => (
                    <li key={idx}>{suggestion}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SuggestionsTable;
