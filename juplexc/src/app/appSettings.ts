export class AppSettings {
    public static DEVICE_ID = '40072';
    public static API_ENDPOINT = `https://preprod.vbn.care/api2/v2/device/${AppSettings.DEVICE_ID}?names=RuntimeSettings`;
    public static AUTHORIZATION_HEADER = 'Bearer RJ56/Rw5vEO2WfAdPih5Lw==';
    public static PROMPT_UPDATE_SUCCESS = 'Awesome! The data has been updated successfully';
    public static PROMPT_UPDATE_FAILURE_1 = 'Oops bro, you seem to have provided invalid data...';
    public static PROMPT_UPDATE_FAILURE_2 = 'Oops bro, something goes wrong, you may call 911...';
    public static PROMPT_COLOR_DANGER = 'red';
    public static PROMPT_COLOR_NORMAL = 'green';
}