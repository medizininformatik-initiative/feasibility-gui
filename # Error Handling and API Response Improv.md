# Error Handling and API Response Improvements

**Reference Issue:** [#88](https://github.com/medizininformatik-initiative/feasibility-gui/issues/88)

## Current Error Codes

The following error codes are currently implemented in the system:

```json
{
  "ERROR": {
    "404": "Standort wurde nicht gefunden",
    "FEAS-10001": "Ihr Account wurde wegen zu vieler Abfragen gesperrt, bitte wenden Sie sich an info@forschen-fuer-gesundheit.de",
    "FEAS-10002": "Sie haben zu viele Abfragen gestellt, bitte warten Sie und probieren Sie es erneut.",
    "FEAS-10003": "Sie haben zu viele Abfragen gestellt, bitte warten Sie und probieren Sie es erneut.",
    "FEAS-10004": "Die Ergebnismenge ist zu klein → Ergebnis wird nicht angezeigt.",
    "FEAS-10005": "Die Anzahl der Standorte, die geantwortet haben, ist zu klein → Detailergebnis wird nicht angezeigt.",
    "FEAS-10006": "Sie haben zu viele Kohorten gespeichert, bitte löschen Sie Kohortenselektionen, bevor Sie weitere speichern.",
    "VAL-20001": "Die Kombination aus Kontext und Termcode(s) wurde nicht gefunden."
  }
}
```

## Missing Error Responses & Required Improvements

### 1. UI Profile Not Found

**Current Behavior:**
- Returns `null` with `200 OK` status
- **Endpoint:** `/terminology/criteria-profile-data`

**Required Change:**
- Should return `204 No Content` instead
- **Proposed Error Code:** `TERM-30001`

### 2. Search Term Yields No Results

**Current Behavior:**
- Returns `{"totalHits":0,"results":[]}` with `200 OK` status
- **Endpoint:** `/terminology/entry/search`

**Required Change:**
- Should return `204 No Content`
- **Proposed Error Code:** `SEARCH-30001`

### 3. Codeable-Concept Search With No Results

**Current Behavior:**
- Returns `{"totalHits":0,"results":[]}` with `200 OK` status  
- **Endpoint:** `/terminology/entry/codeable-concept`

**Required Change:**
- Should return `204 No Content`
- **Proposed Error Code:** `CONCEPT-30001`

### 4. CRTDL Validation Endpoint Missing

**Issue:**
- No validation endpoint exists for CRTDL (Clinical Research Template Definition Language)
- **Reference:** [Issue #320](https://github.com/medizininformatik-initiative/feasibility-gui/issues/320)

**Required Implementation:**
- Define CRTDL validation mechanism
- Introduce version field to CRTDL for compatibility checking
- Current version includes linked profiles for data selection (missing in older versions)
- **Proposed Error Codes:** 
  - `CRTDL-40001`: Invalid CRTDL format
  - `CRTDL-40002`: CRTDL version incompatible

### 5. Patient Profile URL Validation

**Issue:**
- Patient profile URL handling moved to backend
- No error handling for malformed URLs or invalid profiles

**Required Change:**
- Implement error handling for URL validation
- **Proposed Error Codes:**
  - `PROFILE-50001`: Invalid profile URL format
  - `PROFILE-50002`: Profile URL not accessible
  - `PROFILE-50003`: Invalid profile content

### 6. Query Loading by ID via URL Parameters

**Issue:**
- Unclear error handling mechanism for loading queries by ID
- **Reference:** [Issue #416](https://github.com/medizininformatik-initiative/feasibility-gui/issues/416)

**Investigation Needed:**
- Define required error handling mechanism
- **Proposed Error Codes:**
  - `QUERY-60001`: Query ID not found
  - `QUERY-60002`: Query access denied
  - `QUERY-60003`: Query format incompatible

## API Response Standards

### HTTP Status Code Guidelines

| Status Code | Usage | Description |
|-------------|-------|-------------|
| `200 OK` | Data exists | Successful request with response data |
| `204 No Content` | No data | Successful request with no data to return |
| `404 Not Found` | Entity missing | Requested resource does not exist |
| `400 Bad Request` | Invalid input | Request contains invalid parameters |
| `429 Too Many Requests` | Rate limiting | Client has exceeded request limits |

### Error Code Conventions

- **Format:** `CATEGORY-NNNNN` (e.g., `FEAS-10001`)
- **Categories:**
  - `FEAS`: Feasibility-related errors
  - `VAL`: Validation errors
  - `TERM`: Terminology service errors
  - `SEARCH`: Search service errors
  - `CONCEPT`: Concept-related errors
  - `CRTDL`: CRTDL validation errors
  - `PROFILE`: Profile-related errors
  - `QUERY`: Query handling errors

## Implementation Recommendations

1. **Consistency:** All new error cases must be assigned unique issue codes
2. **Localization:** Error messages should support internationalization
3. **Documentation:** Each error code should be documented with:
   - Description
   - Possible causes
   - Recommended user actions
4. **Monitoring:** Implement error tracking for new error codes
5. **Testing:** Add comprehensive test coverage for all error scenarios

## Error Response Format

### Standard Error Response Structure

```json
{
  "error": {
    "code": "FEAS-10001",
    "message": "Ihr Account wurde wegen zu vieler Abfragen gesperrt",
    "details": "Bitte wenden Sie sich an info@forschen-fuer-gesundheit.de",
    "timestamp": "2025-09-18T10:30:00Z",
    "traceId": "abc123def456"
  }
}
```

### Error Categories by HTTP Status

#### 4xx Client Errors
- `400 Bad Request`: `VAL-*` codes (validation errors)
- `401 Unauthorized`: `AUTH-*` codes (authentication errors)
- `403 Forbidden`: `PERM-*` codes (permission errors)
- `404 Not Found`: `NOTFOUND-*` codes (resource not found)
- `429 Too Many Requests`: `FEAS-1000*` codes (rate limiting)

#### 5xx Server Errors
- `500 Internal Server Error`: `SYS-*` codes (system errors)
- `502 Bad Gateway`: `GATEWAY-*` codes (external service errors)
- `503 Service Unavailable`: `SERVICE-*` codes (service unavailable)

## Proposed Error Code Additions

### New Terminology Errors
```json
{
  "TERM-30001": "UI Profile nicht gefunden",
  "TERM-30002": "Terminologie-Service nicht verfügbar",
  "TERM-30003": "Ungültiger Terminologie-Code"
}
```

### New Search Errors
```json
{
  "SEARCH-30001": "Suchbegriff führte zu keinen Ergebnissen",
  "SEARCH-30002": "Ungültiger Suchparameter",
  "SEARCH-30003": "Suchindex nicht verfügbar"
}
```

### New Concept Errors
```json
{
  "CONCEPT-30001": "Codeable-Concept-Suche ergab keine Ergebnisse",
  "CONCEPT-30002": "Ungültiges Codeable-Concept-Format",
  "CONCEPT-30003": "Concept-Mapping nicht gefunden"
}
```

### New CRTDL Errors
```json
{
  "CRTDL-40001": "Ungültiges CRTDL-Format",
  "CRTDL-40002": "CRTDL-Version nicht kompatibel",
  "CRTDL-40003": "CRTDL-Validierung fehlgeschlagen"
}
```

### New Profile Errors
```json
{
  "PROFILE-50001": "Ungültiges Profil-URL-Format",
  "PROFILE-50002": "Profil-URL nicht erreichbar",
  "PROFILE-50003": "Ungültiger Profil-Inhalt",
  "PROFILE-50004": "Profil-Version nicht unterstützt"
}
```

### New Query Errors
```json
{
  "QUERY-60001": "Query-ID nicht gefunden",
  "QUERY-60002": "Zugriff auf Query verweigert",
  "QUERY-60003": "Query-Format nicht kompatibel",
  "QUERY-60004": "Query-Ausführung fehlgeschlagen"
}
```

## Next Steps

1. **Review and Approval**
   - Review proposed error codes with team
   - Approve error message content and translations
   - Validate HTTP status code mappings

2. **Implementation Phase**
   - Implement missing endpoints and error handling
   - Update existing endpoints to use correct status codes
   - Add error code constants and enums

3. **Documentation Update**
   - Update API documentation with new error codes
   - Create error code reference guide
   - Add troubleshooting documentation

4. **Localization**
   - Add German translations for all error messages
   - Prepare for additional language support
   - Implement error message templating

5. **Testing & Monitoring**
   - Add comprehensive test coverage for all error scenarios
   - Implement error tracking and monitoring
   - Create dashboards for error analytics

6. **Migration Plan**
   - Plan gradual rollout of new error handling
   - Ensure backward compatibility where needed
   - Document breaking changes for API consumers