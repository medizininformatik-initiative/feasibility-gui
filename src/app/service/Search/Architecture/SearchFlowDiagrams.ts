/**
 * ═══════════════════════════════════════════════════════════════════════════════
 *                          SEARCH FLOW SEQUENCE DIAGRAMS
 * ═══════════════════════════════════════════════════════════════════════════════
 */

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                        SIMPLE SEARCH FLOW DIAGRAM                           │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ACTORS:
 * • User: End user interacting with the application
 * • Component: Angular component handling UI
 * • Facade: AbstractSearch service (business logic layer)
 * • Mediator: AbstractSearchMediatorService (coordination layer)
 * • Engine: AbstractSearchEngine implementation
 * • Provider: SimpleSearchResultProvider (state management)
 * • API: TerminologyApiService (external communication)
 *
 * SEQUENCE:
 *
 * User                Component           Facade             Mediator            Engine              Provider            API
 *  │                     │                  │                   │                  │                   │                │
 *  │──── search("term")──→│                  │                   │                  │                   │                │
 *  │                     │                  │                   │                  │                   │                │
 *  │                     │── search() ─────→│                   │                  │                   │                │
 *  │                     │                  │                   │                  │                   │                │
 *  │                     │                  │─ searchAndSet() ─→│                  │                   │                │
 *  │                     │                  │                   │                  │                   │                │
 *  │                     │                  │                   │── search() ─────→│                   │                │
 *  │                     │                  │                   │                  │                   │                │
 *  │                     │                  │                   │                  │─ createUrl() ────→│                │
 *  │                     │                  │                   │                  │←─ url ───────────│                │
 *  │                     │                  │                   │                  │                   │                │
 *  │                     │                  │                   │                  │─ fetchAndMap() ──→│─ GET(url) ────→│
 *  │                     │                  │                   │                  │                   │←─ response ────│
 *  │                     │                  │                   │                  │←─ results ────────│                │
 *  │                     │                  │                   │←─ results ───────│                   │                │
 *  │                     │                  │                   │                  │                   │                │
 *  │                     │                  │                   │─ setResults() ───→│                   │                │
 *  │                     │                  │                   │                  │                   │                │
 *  │                     │                  │←─ Observable<T> ──│                  │                   │                │
 *  │                     │←─ Observable<T> ─│                   │                  │                   │                │
 *  │                     │                  │                   │                  │                   │                │
 *  │                     │── subscribe() ───→│                  │                  │                   │                │
 *  │                     │                  │── getResults() ──→│                  │                   │                │
 *  │                     │                  │                   │── getResults() ─→│                   │                │
 *  │                     │                  │                   │←─ Observable ────│                   │                │
 *  │                     │                  │←─ Observable ─────│                  │                   │                │
 *  │                     │←─ results ───────│                   │                  │                   │                │
 *  │←─── display results │                  │                   │                  │                   │                │
 *  │                     │                  │                   │                  │                   │                │
 */

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                    KEYED SEARCH FLOW DIAGRAM (CodeableConcept)              │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ACTORS:
 * • User: End user searching for codeable concepts
 * • Component: Concept search component
 * • Mediator: CodeableConceptSearchMediatorService
 * • Engine: CodeableConceptSearchEngineService
 * • Provider: CodeableConceptSearchResultProviderService (KeyedSearchResultProvider)
 * • API: TerminologyApiService
 *
 * SEQUENCE:
 *
 * User                Component           Mediator                Engine              Provider            API
 *  │                     │                   │                       │                   │                │
 *  │─ search("diabetes") →│                   │                       │                   │                │
 *  │  conceptId="123"     │                   │                       │                   │                │
 *  │                     │                   │                       │                   │                │
 *  │                     │─ searchConcepts() →│                       │                   │                │
 *  │                     │  (term, id, urls) │                       │                   │                │
 *  │                     │                   │                       │                   │                │
 *  │                     │                   │─ search() ───────────→│                   │                │
 *  │                     │                   │  (term, page, id, urls)│                   │                │
 *  │                     │                   │                       │                   │                │
 *  │                     │                   │                       │─ createUrl() ────→│                │
 *  │                     │                   │                       │  with valueSetUrls │                │
 *  │                     │                   │                       │←─ conceptUrl ─────│                │
 *  │                     │                   │                       │                   │                │
 *  │                     │                   │                       │─ fetchAndMap() ──→│─ GET(url) ────→│
 *  │                     │                   │                       │  with mapper       │                │
 *  │                     │                   │                       │                   │←─ response ────│
 *  │                     │                   │                       │←─ conceptResults ─│                │
 *  │                     │                   │←─ results ────────────│                   │                │
 *  │                     │                   │                       │                   │                │
 *  │                     │                   │─ setSearchResults() ──→│                   │                │
 *  │                     │                   │  (conceptId, results)  │                   │                │
 *  │                     │                   │                       │                   │                │
 *  │                     │←─ Observable<T> ──│                       │                   │                │
 *  │                     │                   │                       │                   │                │
 *  │                     │── subscribe() ────→│                       │                   │                │
 *  │                     │                   │── getResults() ───────→│                   │                │
 *  │                     │                   │   (conceptId)          │                   │                │
 *  │                     │                   │←─ Observable ──────────│                   │                │
 *  │                     │←─ conceptResults ─│                       │                   │                │
 *  │←─ display concepts ─│                   │                       │                   │                │
 *  │                     │                   │                       │                   │                │
 *  │                     │                   │                       │                   │                │
 *  │─ load more ────────→│                   │                       │                   │                │
 *  │                     │                   │                       │                   │                │
 *  │                     │─ loadMore() ─────→│                       │                   │                │
 *  │                     │                   │                       │                   │                │
 *  │                     │                   │─ searchAndAppend() ───→│                   │                │
 *  │                     │                   │  (term, page+1, id)    │                   │                │
 *  │                     │                   │                       │                   │                │
 *  │                     │                   │                       │─ search() ───────→│─ GET(url2) ───→│
 *  │                     │                   │                       │  (page 2)          │                │
 *  │                     │                   │                       │                   │←─ moreResults ─│
 *  │                     │                   │                       │←─ moreResults ────│                │
 *  │                     │                   │←─ moreResults ────────│                   │                │
 *  │                     │                   │                       │                   │                │
 *  │                     │                   │─ updateResults() ─────→│                   │                │
 *  │                     │                   │  (conceptId, moreResults)│                  │                │
 *  │                     │                   │                       │                   │                │
 *  │                     │←─ combinedResults │                       │                   │                │
 *  │←─ display more ─────│                   │                       │                   │                │
 *  │                     │                   │                       │                   │                │
 */

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                           PAGINATION FLOW DIAGRAM                           │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ACTORS:
 * • User: End user requesting more results
 * • Component: UI component with pagination controls
 * • Pagination: AbstractSearchPagination service
 * • Mediator: Search mediator service
 * • Provider: Result provider (tracks accumulated results)
 *
 * SEQUENCE:
 *
 * User              Component         Pagination         Mediator          Provider          State
 *  │                   │                  │                 │                 │               │
 *  │─ "Load More" ────→│                  │                 │                 │               │
 *  │                   │                  │                 │                 │               │
 *  │                   │─ loadMore() ────→│                 │                 │               │
 *  │                   │                  │                 │                 │               │
 *  │                   │                  │─ currentPage++ ─│                 │               │
 *  │                   │                  │                 │                 │               │
 *  │                   │                  │─ searchWith     │                 │               │
 *  │                   │                  │   Pagination() ─→│                 │               │
 *  │                   │                  │                 │                 │               │
 *  │                   │                  │                 │─ searchAndUpdate│               │
 *  │                   │                  │                 │   Provider() ───→│               │
 *  │                   │                  │                 │                 │               │
 *  │                   │                  │                 │                 │─ get current ─→│
 *  │                   │                  │                 │                 │   results     │
 *  │                   │                  │                 │                 │←─ existing ───│
 *  │                   │                  │                 │                 │   results     │
 *  │                   │                  │                 │                 │               │
 *  │                   │                  │                 │← new results ───│               │
 *  │                   │                  │                 │                 │               │
 *  │                   │                  │                 │─ merge results ─→│               │
 *  │                   │                  │                 │                 │               │
 *  │                   │                  │                 │                 │─ store merged ─→│
 *  │                   │                  │                 │                 │   results      │
 *  │                   │                  │← combined ──────│                 │               │
 *  │                   │                  │   results       │                 │               │
 *  │                   │← paginated ──────│                 │                 │               │
 *  │                   │   results        │                 │                 │               │
 *  │← display all ─────│                  │                 │                 │               │
 *  │   results         │                  │                 │                 │               │
 *  │                   │                  │                 │                 │               │
 */

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                        ERROR HANDLING FLOW DIAGRAM                          │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ACTORS:
 * • API: External API service (may fail)
 * • Engine: Search engine (handles API errors)
 * • Mediator: Mediator service (coordinates error response)
 * • Provider: Result provider (manages error state)
 * • Component: UI component (displays error to user)
 *
 * SEQUENCE:
 *
 * Component         Mediator          Engine            API               Provider          User
 *     │                │                │                │                   │               │
 *     │─ search() ─────→│                │                │                   │               │
 *     │                │                │                │                   │               │
 *     │                │─ search() ─────→│                │                   │               │
 *     │                │                │                │                   │               │
 *     │                │                │─ fetchData() ──→│                   │               │
 *     │                │                │                │                   │               │
 *     │                │                │                ✗ API Error         │               │
 *     │                │                │←─ Error ───────│                   │               │
 *     │                │                │                │                   │               │
 *     │                │←─ catchError() ─│                │                   │               │
 *     │                │   handle error  │                │                   │               │
 *     │                │                │                │                   │               │
 *     │                │─ setError() ───→│                │                   │               │
 *     │                │   state         │                │                   │               │
 *     │                │                │                │                   │               │
 *     │← ErrorObservable│                │                │                   │               │
 *     │                │                │                │                   │               │
 *     │─ displayError() │                │                │                   │               │
 *     │                │                │                │                   │               │
 *     │                │                │                │                   │               │
 *     │─ retry() ──────→│                │                │                   │               │
 *     │                │                │                │                   │               │
 *     │                │─ clearError() ──→│                │                   │               │
 *     │                │                │                │                   │               │
 *     │                │─ search() ─────→│─ fetchData() ──→│                   │               │
 *     │                │   (retry)       │                │                   │               │
 *     │                │                │                ✓ Success           │               │
 *     │                │                │←─ results ─────│                   │               │
 *     │                │←─ results ──────│                │                   │               │
 *     │                │                │                │                   │               │
 *     │                │─ setResults() ──→│                │                   │               │
 *     │                │                │                │                   │               │
 *     │← results ──────│                │                │                   │               │
 *     │                │                │                │                   │               │
 *     │─ displayResults │                │                │                   │               │
 *     │                │                │                │                   │               │
 */

export const SEARCH_FLOW_DIAGRAMS = {
  simpleSearch: 'Basic search flow through all layers',
  keyedSearch: 'Complex keyed search with concept filters',
  pagination: 'Pagination flow with result accumulation',
  errorHandling: 'Error handling and recovery patterns',

  flowTypes: [
    'Initial Search Flow',
    'Pagination Flow',
    'Filter Update Flow',
    'Error Recovery Flow',
    'Cache Hit Flow',
    'Real-time Update Flow',
  ],

  keyObservations: [
    'All flows are reactive using RxJS observables',
    'Error handling is built into each layer',
    'State is managed centrally in result providers',
    'Components are decoupled from search logic',
    'Pagination accumulates results rather than replacing',
    'Keyed searches maintain separate result sets',
  ],
};
