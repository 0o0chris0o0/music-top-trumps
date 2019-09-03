const env = process.env.NODE_ENV === 'production' ? 'production' : 'staging';

const config = {
  staging: {
    apiKey:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9yYWNkaWdpdGFsLmNvLnVrIiwiYXVkIjoiaHR0cDpcL1wvY29sbGFib3JhdGl2ZXBsYXlsaXN0LnJhY2RpZ2l0YWwuY28udWtcLyIsImlhdCI6MTQ3MTM1NjU4NywidWlkIjoiZXlKcGRpSTZJbFZVWkc1TU5ITnNlVGwyTWtKc2QxWTBUV3BrTVVFOVBTSXNJblpoYkhWbElqb2ljMUIwWWl0V1VqVkZWV3g0ZFd4T05HeEhlRXBxWnowOUlpd2liV0ZqSWpvaU5Ea3hOalZoWmpsbFpEa3pNVGczTUdGaE5qY3daV0V5WVdNMk1qRTBOekUzWVRFMk1ERTNPR1k0WldObVltRmhOMlV4TlRZd01qRXlNVEF5TmpRelppSjkifQ.OossBtXgJ5ZJ6T3-WhN-c8cEVPHuoj7bDTM2_A9JYeI',
    apiUrl: 'https://api-staging.racdigital.co.uk/v1/',
    recaptchaId: '6Lc5PSoUAAAAAOJrFz4dNDd7C6voE3TqhNg1Oq01',
    directusTableName: 'red_apple_starter',
    googleAnalyticsId: 'UA-123456-1'
  },
  production: {
    apiKey:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9yYWNkaWdpdGFsLmNvLnVrIiwiYXVkIjoiaHR0cDpcL1wvY29sbGFib3JhdGl2ZXBsYXlsaXN0LnJhY2RpZ2l0YWwuY28udWtcLyIsImlhdCI6MTQ3MTM1NjU4NywidWlkIjoiZXlKcGRpSTZJbFZVWkc1TU5ITnNlVGwyTWtKc2QxWTBUV3BrTVVFOVBTSXNJblpoYkhWbElqb2ljMUIwWWl0V1VqVkZWV3g0ZFd4T05HeEhlRXBxWnowOUlpd2liV0ZqSWpvaU5Ea3hOalZoWmpsbFpEa3pNVGczTUdGaE5qY3daV0V5WVdNMk1qRTBOekUzWVRFMk1ERTNPR1k0WldObVltRmhOMlV4TlRZd01qRXlNVEF5TmpRelppSjkifQ.OossBtXgJ5ZJ6T3-WhN-c8cEVPHuoj7bDTM2_A9JYeI',
    apiUrl: 'https://api-staging.racdigital.co.uk/v1/',
    recaptchaId: '6Lc5PSoUAAAAAOJrFz4dNDd7C6voE3TqhNg1Oq01',
    directusTableName: 'red_apple_starter',
    googleAnalyticsId: 'UA-123456-1'
  }
};

module.exports = config[env];
