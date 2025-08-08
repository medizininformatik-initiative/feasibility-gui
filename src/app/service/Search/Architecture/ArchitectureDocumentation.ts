/**
 * CLEAN 3-LAYER SEARCH RESULT PROVIDER ARCHITECTURE
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │                    LAYER 1: ABSTRACT BASE                  │
 * │            AbstractSearchResultProvider<C, T>              │
 * │                                                             │
 * │  • Defines the contract/interface                          │
 * │  • Abstract methods: setSearchResults, getSearchResults,   │
 * │    updateSearchResults, clearResults, clearAllResults      │
 * │  • Pure abstraction - no implementation                    │
 * └─────────────────────────────────────────────────────────────┘
 *                                │
 *                                ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │                     LAYER 2A: SIMPLE                       │
 * │             SimpleSearchResultProvider<C, T>               │
 * │                                                             │
 * │  • Extends AbstractSearchResultProvider                    │
 * │  • Implements single result storage                        │
 * │  • Uses BehaviorSubject<T | null>                          │
 * │  • Methods: setSearchResults(result), getSearchResults()   │
 * │  • Perfect for traditional search scenarios                │
 * └─────────────────────────────────────────────────────────────┘
 *                                │
 *                                ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │                   CONCRETE IMPLEMENTATIONS                  │
 * │            BasicSearchResultProviderService                │
 * │           PatientSearchResultProviderService               │
 * │                                                             │
 * │  • Extend SimpleSearchResultProvider                       │
 * │  • Add domain-specific business logic                      │
 * │  • Custom methods and validation                           │
 * └─────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │                     LAYER 2B: KEYED                        │
 * │              KeyedSearchResultProvider<C, T>               │
 * │                                                             │
 * │  • Extends AbstractSearchResultProvider                    │
 * │  • Implements multi-key result storage                     │
 * │  • Uses BehaviorSubject<Map<string, T | null>>             │
 * │  • Methods: setSearchResults(key, result), etc.            │
 * │  • Perfect for complex search scenarios                    │
 * └─────────────────────────────────────────────────────────────┘
 *                                │
 *                                ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │                   CONCRETE IMPLEMENTATIONS                  │
 * │        CodeableConceptSearchResultProviderService          │
 * │          AdvancedSearchResultProviderService               │
 * │                                                             │
 * │  • Extend KeyedSearchResultProvider                        │
 * │  • Add domain-specific business logic                      │
 * │  • Concept filter management, category logic, etc.        │
 * └─────────────────────────────────────────────────────────────┘
 *
 * ═══════════════════════════════════════════════════════════════
 *
 * ARCHITECTURE BENEFITS:
 *
 * ✅ CLEAR SEPARATION OF CONCERNS
 *    - Each layer has a single responsibility
 *    - Abstract layer defines contract
 *    - Implementation layers provide storage strategy
 *    - Concrete services add business logic
 *
 * ✅ TYPE SAFETY
 *    - Full TypeScript generics support
 *    - Compile-time type checking
 *    - No runtime type errors
 *
 * ✅ EXTENSIBILITY
 *    - Easy to add new storage strategies
 *    - Simple to create domain-specific providers
 *    - No breaking changes to existing code
 *
 * ✅ MAINTAINABILITY
 *    - Single place to modify base behavior
 *    - Clear inheritance hierarchy
 *    - No complex method overloading
 *
 * ✅ TESTABILITY
 *    - Each layer can be tested independently
 *    - Easy to mock dependencies
 *    - Clear interfaces for testing
 *
 * ═══════════════════════════════════════════════════════════════
 *
 * USAGE DECISION TREE:
 *
 * Do you need multiple result sets with keys?
 * ├─ YES → Extend KeyedSearchResultProvider
 * │        → Use for: CodeableConcept, ValueSet filters,
 * │          Category-based searches, Multi-context results
 * │
 * └─ NO  → Extend SimpleSearchResultProvider
 *          → Use for: Basic searches, Single result lists,
 *            Traditional pagination, Simple filters
 *
 * ═══════════════════════════════════════════════════════════════
 */
