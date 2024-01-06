import axios from 'axios';
import cheerio from 'cheerio';

const fetchBuiltWithInfo = async (url) => {
  try {
    // Fetch HTML content from the BuiltWith page of the provided URL
    const { data } = await axios.get(`https://builtwith.com/${url}`);

    // Load HTML content into Cheerio
    const $ = cheerio.load(data);

    // Define the structure of the builtwith object
    let builtwith = {
      url: url,
      stack: {}
    };

    // Helper function to extract data based on the provided selector and parent
    const extractData = (parentSelector, childSelector, categoryName) => {
      let elements = [];
      $(parentSelector).find(childSelector).each((index, element) => {
        elements.push($(element).text().trim());
      });

      // Log each category with its elements
      console.log(`\n${categoryName}:`);
      elements.forEach(e => console.log(` - ${e}`));

      return elements;
    };

    // Extract data for each category based on the sitemap
    builtwith.stack.widgets = extractData("div.card:nth-of-type(1) div.pb-0", "a.text-dark", "Widgets");
    builtwith.stack.frameworks = extractData("div.card:nth-of-type(2) div.card-body", "a.text-dark", "Frameworks");
    builtwith.stack.mobile = extractData("div:nth-of-type(3) div.pb-0", "a.text-dark", "Mobile Technologies");
    builtwith.stack.contentDeliveryNetwork = extractData("div:nth-of-type(4) div.pb-0", "a.text-dark", "Content Delivery Network");
    builtwith.stack.contentManagementSystem = extractData("div:nth-of-type(5) div.pb-0", "h2 a", "Content Management System");
    builtwith.stack.javascriptLibs = extractData("div:nth-of-type(6) div.pb-0", "h2 a", "Javascript Libraries");
    builtwith.stack.links = extractData("div:nth-of-type(7) div.card-body", "a.text-dark", "Links");
    builtwith.stack.hostingprovider = extractData("div:nth-of-type(8) div.card-body", "a.text-dark", "Hosting Provider");
    builtwith.stack.SSLCerts = extractData("div:nth-of-type(9) div.card-body", "a.text-dark", "SSL Certificates");
    builtwith.stack.emailHost = extractData("div:nth-of-type(10) div.card-body", "a.text-dark", "Email Hosting");
    builtwith.stack.nameServer = extractData("div:nth-of-type(11) div.card-body", "a.text-dark", "Name Server");
    builtwith.stack.webServer = extractData("div:nth-of-type(12) div.card-body", "a.text-dark", "Web Server");
    builtwith.stack.syndication = extractData("div:nth-of-type(13) div.card-body", "a.text-dark", "Syndication");

    return builtwith;
  } catch (error) {
    console.error('Error fetching BuiltWith data:', error);
    return null;
  }
};

// Example usage
const url = 'mattrichmond.ca'; // Example URL
fetchBuiltWithInfo(url).then(builtwith => console.log('\nBuiltWith Data:', builtwith));
