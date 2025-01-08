export const cleanAndParseJSON = (response) => {
    try {
      // First, let's log the raw response to see what we're dealing with
      console.log('Raw response:', response);
  
      // Remove any markdown code block indicators and trim
      let cleanResponse = response.replace(/```json|```/g, '').trim();
      
      // Remove any invisible characters and normalize whitespace
      cleanResponse = cleanResponse.replace(/[\u200B-\u200D\uFEFF]/g, '');
      cleanResponse = cleanResponse.replace(/\r?\n|\r/g, ' ');
      
      // Remove any non-JSON content before and after the JSON structure
      cleanResponse = cleanResponse.replace(/^[^{]*({[\s\S]*})[^}]*$/, '$1');
      
      // Handle escaped quotes and normalize quotation marks
      cleanResponse = cleanResponse.replace(/\\"/g, '"');
      cleanResponse = cleanResponse.replace(/[""]/g, '"');
      
      // Log the cleaned response before parsing
      console.log('Cleaned response:', cleanResponse);
  
      try {
        // First attempt: direct parsing
        return JSON.parse(cleanResponse);
      } catch (initialError) {
        console.log('Initial parsing failed, attempting additional cleaning...');
        
        // Second attempt: stricter cleaning
        cleanResponse = cleanResponse.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2":');
        cleanResponse = cleanResponse.replace(/:\s*(['"])?([^,[{\s"].*?)(['"])?\s*(,|}|])/g, ':"$2"$4');
        
        console.log('Further cleaned response:', cleanResponse);
        return JSON.parse(cleanResponse);
      }
    } catch (error) {
      console.error('JSON parsing error:', error);
      console.error('Error position:', error.message);
      
      // Log problematic character if position is available
      if (error.message.includes('position')) {
        const position = parseInt(error.message.match(/position (\d+)/)[1]);
        console.error('Character at error position:', response.charAt(position));
        console.error('Surrounding context:', response.substring(position - 20, position + 20));
      }
      
      throw new Error(`JSON Parsing failed: ${error.message}`);
    }
  };