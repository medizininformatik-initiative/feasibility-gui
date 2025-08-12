/**
 * ═══════════════════════════════════════════════════════════════════════════════
 *                        BACKEND COMMUNICATION FLOW DIAGRAMS
 * ═══════════════════════════════════════════════════════════════════════════════
 */

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                      STANDARD API REQUEST FLOW DIAGRAM                      │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ACTORS:
 * • SearchService: Frontend search service initiating request
 * • ApiService: Domain-specific API service (e.g., TerminologyApiService)
 * • BackendService: Core backend communication service
 * • HttpClient: Angular HTTP client
 * • AuthStorage: OAuth token storage
 * • BackendAPI: External backend REST API
 *
 * SEQUENCE:
 *
 * SearchService    ApiService      BackendService    HttpClient      AuthStorage     BackendAPI
 *     │               │                  │              │               │              │
 *     │─ search() ────→│                  │              │               │              │
 *     │               │                  │              │               │              │
 *     │               │─ buildRequest() ─→│              │               │              │
 *     │               │                  │              │               │              │
 *     │               │                  │─ createUrl() ─→│               │              │
 *     │               │                  │  (path, params)│               │              │
 *     │               │                  │←─ fullUrl ────│               │              │
 *     │               │                  │              │               │              │
 *     │               │                  │─ getHeaders() ─→│               │              │
 *     │               │                  │              │               │              │
 *     │               │                  │              │─ getToken() ──→│              │
 *     │               │                  │              │←─ accessToken ─│              │
 *     │               │                  │              │               │              │
 *     │               │                  │←─ authHeaders ─│               │              │
 *     │               │←─ url + headers ─│              │               │              │
 *     │               │                  │              │               │              │
 *     │               │─ http.get() ─────→│──────────────→│───────────────→│─ GET ─────→│
 *     │               │  (url, headers)   │              │               │  /api/...   │
 *     │               │                  │              │               │             │
 *     │               │                  │              │               │             ✓ Auth OK
 *     │               │                  │              │               │←─ response ─│
 *     │               │                  │              │←──────────────│             │
 *     │               │←─ Observable ────│←─────────────│               │             │
 *     │←─ Observable ─│                  │              │               │             │
 *     │               │                  │              │               │             │
 */

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                       CHUNKED REQUEST FLOW DIAGRAM                          │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ACTORS:
 * • ApiService: Service needing bulk data (e.g., getCriteriaProfileData)
 * • ChunkedService: ChunkedRequestService handling large requests
 * • BackendService: URL building and authentication
 * • HttpClient: Multiple parallel HTTP requests
 * • BackendAPI: Backend API handling individual chunks
 *
 * SEQUENCE:
 *
 * ApiService       ChunkedService    BackendService    HttpClient        BackendAPI
 *     │                 │                  │              │                │
 *     │─ bulkRequest() ─→│                  │              │                │
 *     │  (1000+ IDs)     │                  │              │                │
 *     │                 │                  │              │                │
 *     │                 │─ chunkArray() ───→│              │                │
 *     │                 │  (chunks of 50)   │              │                │
 *     │                 │←─ chunkedArrays ──│              │                │
 *     │                 │                  │              │                │
 *     │                 │─ forEach chunk ──→│─ createUrl() ─→│                │
 *     │                 │                  │  (chunk1)     │                │
 *     │                 │                  │←─ url1 ───────│                │
 *     │                 │                  │              │                │
 *     │                 │                  │─ createUrl() ─→│                │
 *     │                 │                  │  (chunk2)     │                │
 *     │                 │                  │←─ url2 ───────│                │
 *     │                 │                  │              │                │
 *     │                 │─ forkJoin() ─────→│──────────────→│─ GET url1 ────→│
 *     │                 │  [obs1, obs2, ...]│              │─ GET url2 ────→│
 *     │                 │                  │              │─ GET url3 ────→│
 *     │                 │                  │              │                │
 *     │                 │                  │              │                ✓ Parallel
 *     │                 │                  │              │                  Processing
 *     │                 │                  │              │←─ response1 ───│
 *     │                 │                  │              │←─ response2 ───│
 *     │                 │                  │              │←─ response3 ───│
 *     │                 │                  │←─────────────│                │
 *     │                 │←─ [res1,res2..] ─│              │                │
 *     │                 │                  │              │                │
 *     │                 │─ mergeResults() ─→│              │                │
 *     │                 │←─ combinedData ───│              │                │
 *     │←─ Observable ───│                  │              │                │
 *     │   (all data)    │                  │              │                │
 *     │                 │                  │              │                │
 */

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                     AUTHENTICATION FLOW DIAGRAM                             │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ACTORS:
 * • User: End user of the application
 * • Component: Angular component
 * • AuthService: Authentication service
 * • OAuthStorage: Token storage service
 * • BackendService: Service making authenticated requests
 * • OIDC Provider: External OAuth2/OIDC provider (e.g., Keycloak)
 * • BackendAPI: Protected backend API
 *
 * SEQUENCE:
 *
 * User         Component     AuthService     OAuthStorage    BackendService   OIDC Provider   BackendAPI
 *  │              │             │               │                │               │              │
 *  │─ login ─────→│             │               │                │               │              │
 *  │              │             │               │                │               │              │
 *  │              │─ login() ───→│               │                │               │              │
 *  │              │             │               │                │               │              │
 *  │              │             │─ redirect ────→│                │               │──────────────→│
 *  │              │             │   to OIDC     │                │               │   auth flow   │
 *  │←─────────────│←────────────│←──────────────│                │               │              │
 *  │              │             │               │                │               │              │
 *  │─ provides credentials ─────→│               │                │               │──────────────→│
 *  │              │             │               │                │               │              │
 *  │              │             │               │                │               │              ✓ Auth
 *  │              │             │               │                │               │←─ tokens ────│
 *  │              │             │←─ callback ───│                │               │   (access,   │
 *  │              │             │   with tokens │                │               │    refresh)  │
 *  │              │             │               │                │               │              │
 *  │              │             │─ storeTokens()→│                │               │              │
 *  │              │             │               │                │               │              │
 *  │              │←─ success ──│               │                │               │              │
 *  │←─ logged in ─│             │               │                │               │              │
 *  │              │             │               │                │               │              │
 *  │              │             │               │                │               │              │
 *  │─ makeRequest │             │               │                │               │              │
 *  │              │             │               │                │               │              │
 *  │              │─ apiCall() ─────────────────────────────────→│               │              │
 *  │              │             │               │                │               │              │
 *  │              │             │               │                │─ getHeaders() ─→│              │
 *  │              │             │               │                │               │              │
 *  │              │             │               │                │─ getToken() ──→│              │
 *  │              │             │               │                │←─ accessToken ─│              │
 *  │              │             │               │                │               │              │
 *  │              │             │               │                │─ addBearer() ──→│              │
 *  │              │             │               │                │   Header       │              │
 *  │              │             │               │                │               │              │
 *  │              │             │               │                │─ httpRequest ──→│              │
 *  │              │             │               │                │   with Bearer  │              │
 *  │              │             │               │                │                │              │
 *  │              │             │               │                │                │──────────────→│
 *  │              │             │               │                │                │  Bearer xyz   │
 *  │              │             │               │                │                │              │
 *  │              │             │               │                │                │              ✓ Token
 *  │              │             │               │                │                │                Valid
 *  │              │             │               │                │                │←─ response ───│
 *  │              │             │               │                │←───────────────│              │
 *  │              │←─ data ─────────────────────────────────────│               │              │
 *  │←─ display ───│             │               │                │               │              │
 *  │              │             │               │                │               │              │
 */

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                         ERROR HANDLING FLOW DIAGRAM                         │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ACTORS:
 * • ApiService: Service making the API call
 * • BackendService: Core backend service
 * • HttpClient: Angular HTTP client with error handling
 * • BackendAPI: Backend API (may return errors)
 * • ErrorHandler: Centralized error handling service
 * • User: End user seeing error feedback
 *
 * SEQUENCE:
 *
 * ApiService    BackendService    HttpClient      BackendAPI     ErrorHandler     User
 *     │             │               │               │              │             │
 *     │─ request() ─→│               │               │              │             │
 *     │             │               │               │              │             │
 *     │             │─ http.get() ──→│               │              │             │
 *     │             │               │               │              │             │
 *     │             │               │─ GET ────────→│              │             │
 *     │             │               │               │              │             │
 *     │             │               │               ✗ 500 Error   │             │
 *     │             │               │←─ HttpError ──│              │             │
 *     │             │               │   Response    │              │             │
 *     │             │←─ Error ──────│               │              │             │
 *     │←─ Error ────│               │               │              │             │
 *     │             │               │               │              │             │
 *     │─ catchError() ──────────────────────────────────────────→│             │
 *     │             │               │               │              │             │
 *     │             │               │               │              │─ logError() ─→│
 *     │             │               │               │              │             │
 *     │             │               │               │              │─ showToast() ─→│
 *     │             │               │               │              │   "Error     │
 *     │             │               │               │              │    occurred" │
 *     │             │               │               │              │             │
 *     │─ retry() ───→│               │               │              │             │
 *     │  (optional)  │               │               │              │             │
 *     │             │               │               │              │             │
 *     │             │─ http.get() ──→│               │              │             │
 *     │             │   (retry)     │               │              │             │
 *     │             │               │               │              │             │
 *     │             │               │─ GET ────────→│              │             │
 *     │             │               │               │              │             │
 *     │             │               │               ✓ Success     │             │
 *     │             │               │←─ data ───────│              │             │
 *     │             │←─ data ───────│               │              │             │
 *     │←─ data ─────│               │               │              │             │
 *     │             │               │               │              │             │
 */

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                      FEASIBILITY QUERY EXECUTION FLOW                       │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ACTORS:
 * • QueryComponent: Component with query form
 * • QueryService: Business logic service
 * • FeasibilityAPI: FeasibilityQueryApiService
 * • BackendService: Core backend service
 * • BackendAPI: Feasibility backend API
 * • ResultAPI: Query result retrieval API
 *
 * SEQUENCE:
 *
 * QueryComponent   QueryService    FeasibilityAPI   BackendService   BackendAPI    ResultAPI
 *      │               │               │                │              │             │
 *      │─ executeQuery →│               │                │              │             │
 *      │  (criteria)    │               │                │              │             │
 *      │               │               │                │              │             │
 *      │               │─ buildQuery() ─→│                │              │             │
 *      │               │  (structuredQ) │                │              │             │
 *      │               │               │                │              │             │
 *      │               │               │─ validate() ───→│─ POST ──────→│             │
 *      │               │               │  Query         │  /validate   │             │
 *      │               │               │                │              │             │
 *      │               │               │                │              ✓ Valid      │
 *      │               │               │←─ validation ──│←─ response ──│             │
 *      │               │               │   OK           │              │             │
 *      │               │←─ validated ──│                │              │             │
 *      │←─ validation ─│               │                │              │             │
 *      │   feedback    │               │                │              │             │
 *      │               │               │                │              │             │
 *      │─ confirmExec ─→│               │                │              │             │
 *      │               │               │                │              │             │
 *      │               │─ execute() ───→│                │              │             │
 *      │               │               │                │              │             │
 *      │               │               │─ postQuery() ──→│─ POST ──────→│             │
 *      │               │               │  (structuredQ) │  /execute    │             │
 *      │               │               │                │              │             │
 *      │               │               │                │              ✓ Accepted   │
 *      │               │               │←─ location ────│←─ 202 +      │             │
 *      │               │               │   header       │   Location   │             │
 *      │               │←─ queryId ────│                │              │             │
 *      │←─ executing ──│               │                │              │             │
 *      │               │               │                │              │             │
 *      │               │               │                │              │             │
 *      │─ pollResults ─→│               │                │              │             │
 *      │  (queryId)     │               │                │              │             │
 *      │               │               │                │              │             │
 *      │               │─ getResults() ─→│                │              │             │
 *      │               │  (queryId)     │                │              │             │
 *      │               │               │                │              │             │
 *      │               │               │─ getResult() ──→│─ GET ───────→│─ GET ──────→│
 *      │               │               │  (location)    │  /result/id  │  /query/   │
 *      │               │               │                │              │   result   │
 *      │               │               │                │              │             │
 *      │               │               │                │              │             ✓ Ready
 *      │               │               │                │              │←─ results ──│
 *      │               │               │←─ results ─────│←─ data ──────│             │
 *      │               │←─ results ────│                │              │             │
 *      │←─ display ────│               │                │              │             │
 *      │   results     │               │                │              │             │
 *      │               │               │                │              │             │
 */

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                       CODEABLE CONCEPT SEARCH FLOW                          │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ACTORS:
 * • SearchComponent: Component with concept search
 * • ConceptMediator: CodeableConceptSearchMediatorService
 * • ConceptEngine: CodeableConceptSearchEngineService
 * • TerminologyAPI: TerminologyApiService
 * • BackendService: Core backend service
 * • ElasticSearch: Backend Elasticsearch API
 *
 * SEQUENCE:
 *
 * SearchComponent  ConceptMediator  ConceptEngine   TerminologyAPI  BackendService  ElasticSearch
 *       │               │              │               │               │              │
 *       │─ search() ────→│              │               │               │              │
 *       │ "diabetes"     │              │               │               │              │
 *       │ conceptId=123  │              │               │               │              │
 *       │ valueSetUrls   │              │               │               │              │
 *       │               │              │               │               │              │
 *       │               │─ searchConcept│               │               │              │
 *       │               │  AndSet() ────→│               │               │              │
 *       │               │              │               │               │              │
 *       │               │              │─ createUrl() ─→│               │              │
 *       │               │              │ with valueSets │               │              │
 *       │               │              │ and filters    │               │              │
 *       │               │              │←─ searchUrl ───│               │              │
 *       │               │              │               │               │              │
 *       │               │              │─ search() ─────→│               │              │
 *       │               │              │ (searchUrl)    │               │              │
 *       │               │              │               │               │              │
 *       │               │              │               │─ getElastic ──→│              │
 *       │               │              │               │  SearchResults │              │
 *       │               │              │               │ (url)          │              │
 *       │               │              │               │               │              │
 *       │               │              │               │               │─ createUrl() ─→│
 *       │               │              │               │               │ with headers  │
 *       │               │              │               │               │ and auth      │
 *       │               │              │               │               │              │
 *       │               │              │               │               │─ GET ────────→│
 *       │               │              │               │               │ /terminology/ │
 *       │               │              │               │               │ entry/search  │
 *       │               │              │               │               │ ?q=diabetes   │
 *       │               │              │               │               │ &valueSet=... │
 *       │               │              │               │               │              │
 *       │               │              │               │               │              ✓ Search
 *       │               │              │               │               │                Executed
 *       │               │              │               │               │←─ hits ───────│
 *       │               │              │               │               │ { results,    │
 *       │               │              │               │               │   total,      │
 *       │               │              │               │               │   facets }    │
 *       │               │              │               │←─ elasticResp ─│              │
 *       │               │              │←─ mapped ─────│               │              │
 *       │               │              │   results     │               │              │
 *       │               │←─ conceptList │               │               │              │
 *       │               │              │               │               │              │
 *       │               │─ setResults() ─→│               │               │              │
 *       │               │ (conceptId,    │               │               │              │
 *       │               │  results)      │               │               │              │
 *       │               │              │               │               │              │
 *       │←─ Observable ──│              │               │               │              │
 *       │ concepts      │              │               │               │              │
 *       │               │              │               │               │              │
 *       │─ subscribe() ──→│              │               │               │              │
 *       │               │              │               │               │              │
 *       │               │─ getResults() ─→│               │               │              │
 *       │               │ (conceptId)   │               │               │              │
 *       │               │←─ Observable ──│               │               │              │
 *       │←─ concepts ────│              │               │               │              │
 *       │               │              │               │               │              │
 *       │─ displayResults│              │               │               │              │
 *       │               │              │               │               │              │
 */

export const BACKEND_FLOW_DIAGRAMS = {
  standardRequest: 'Standard API request with authentication',
  chunkedRequest: 'Large request handling with parallel processing',
  authentication: 'OAuth2/OIDC authentication flow',
  errorHandling: 'Comprehensive error handling and recovery',
  feasibilityQuery: 'Complete feasibility query execution cycle',
  conceptSearch: 'CodeableConcept search with Elasticsearch',

  flowTypes: [
    'Standard API Request Flow',
    'Chunked Request Flow',
    'Authentication Flow',
    'Error Handling Flow',
    'Query Execution Flow',
    'Search Request Flow',
    'Bulk Data Flow',
    'Real-time Polling Flow',
  ],

  keyObservations: [
    'All requests include OAuth2 Bearer token authentication',
    'Large requests are automatically chunked for performance',
    'Error handling is centralized with retry mechanisms',
    'Parallel processing used for bulk operations',
    'URL building is centralized in BackendService',
    'Path management is separated from business logic',
    'Type safety maintained throughout the request chain',
    'Reactive patterns used for all async operations',
  ],

  authenticationFeatures: [
    'OAuth2/OIDC integration',
    'Automatic token injection',
    'Secure token storage',
    'Token refresh handling',
    'Centralized auth logic',
  ],

  performanceOptimizations: [
    'Request chunking for large datasets',
    'Parallel processing with forkJoin',
    'Efficient URL building',
    'Smart request batching',
    'Response caching strategies',
  ],
};
