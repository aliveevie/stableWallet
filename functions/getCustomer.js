async function getCustomerDetails(customerName, countryCode, customerDid) {
    const url = `https://mock-idv.tbddev.org/kcc?name=${customerName}&country=${countryCode}&did=${customerDid}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  }
  
export default getCustomerDetails;