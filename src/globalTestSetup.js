// Since our application displays timezones,
// we need to mock the timezone when testing in order to ensure
// that changes in timezone (i.e. EST to EDT) don't break tests
export default () => {
  process.env.TZ = "UTC";
};
