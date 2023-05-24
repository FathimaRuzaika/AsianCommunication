import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import algoliasearch from 'algoliasearch/lite';
import '@algolia/autocomplete-theme-classic';
import { useNavigate } from 'react-router-dom';
import { autocomplete } from '@algolia/autocomplete-js';

const AutocompleteSearchBox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const loadAutocomplete = async () => {
      if (typeof window !== 'undefined') {
        const { autocomplete } = await import('@algolia/autocomplete-js');

        const searchClient = algoliasearch(
          '8GNM3PIMWN',
          'ead73c8ee0af4efd071d851c4bf5f110'
        );

        if (autocompleteRef.current) {
          autocompleteRef.current.destroy(); // Destroy previous instance if exists
        }

        autocompleteRef.current = autocomplete({
          container: '#autocomplete',
          placeholder: 'search products...',
          openOnFocus: true,
          getSources: () => [
            {
              sourceId: 'products',
              getItems({ state }) {
                return searchClient
                  .initIndex('AI_Query_Search_Autocomplete')
                  .search(state.query, {
                    hitsPerPage: 10, // Set the hitsPerPage parameter to 10
                    attributesToHighlight: ['name', 'brand', 'category'],
                  })
                  .then(({ hits }) => {
                    const filteredHits = hits.filter((item) => {
                      const isValid =
                        item.name &&
                        typeof item.name === 'string' &&
                        item.name.trim() !== '';
                      return isValid;
                    });

                    return filteredHits.map((item) => ({
                      ...item,
                      label: item.name,
                    }));
                  });
              },

              templates: {
                item({ item }) {
                  return item.label;
                },
              },
            },
          ],

          onStateChange({ state }) {
            if (state.query) {
              setQuery(state.query);
            }
          },
          onSelection({ event, suggestion, dataset }) {
            handleSelection(event, suggestion, dataset);
          },
        });
      }
    };

    loadAutocomplete();

    return () => {
      if (autocompleteRef.current) {
        autocompleteRef.current.destroy(); // Cleanup Autocomplete instance on unmount
      }
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  const handleSelection = (event, suggestion, dataset) => {
    setQuery(suggestion.name);
  };

  return (
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
      <div className="algcontainer d-flex">
        <div id="autocomplete"></div>{' '}
        <Button
          variant="outline-primary"
          type="submit"
          id="button-search"
          style={{ height: '46px' }}
        >
          <i className="fas fa-search"></i>
        </Button>
      </div>
    </Form>
  );
};

export default AutocompleteSearchBox;
