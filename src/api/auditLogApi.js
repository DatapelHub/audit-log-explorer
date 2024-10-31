const BASE_URL = 'https://api2.datapel.net/api.datapel/v2.0/public/auditevents';

export const getAuditEvents = async (token, page = 1, pageSize = 10) => {
  try {
    const skip = (page - 1) * pageSize;
    const url = `${BASE_URL}?$top=${pageSize}&$skip=${skip}&$orderby=AuditEventTimeStamp desc&$inlinecount=allpages`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'scope': 'pub',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token expired');
      }
      throw new Error('Failed to fetch audit logs');
    }

    const data = await response.json();
    
    if (data && data.d) {
      return {
        results: data.d.results,
        totalCount: parseInt(data.d.__count, 10)
      };
    }
    
    console.log('Unexpected data format:', data);
    return { results: [], totalCount: 0 };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}; 