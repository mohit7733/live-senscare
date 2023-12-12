// // src/services/translateService.js
// import AWS from 'aws-sdk';
// import translate from './awsConfig';

// export const translateText = async (text, targetLanguage) => {
//     const params = {
//         Text: text,
//         SourceLanguageCode: 'en', // or specify source language code
//         TargetLanguageCode: targetLanguage,
//     };

//     try {
//         const result = await translate.translateText(params).promise();
//         return result.TranslatedText;
//     } catch (error) {
//         console.error('Translation error:', error);
//         return text; // Return original text on error
//     }
// };
