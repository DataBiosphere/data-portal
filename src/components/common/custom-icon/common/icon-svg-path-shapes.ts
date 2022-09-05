export type IconName = "discourse" | "github" | "slack" | "twitter" | "youtube";
type SVGPathShape = string;

export const IconSvgPathShapes: Record<IconName, SVGPathShape[]> = {
  discourse: [
    "M12.0376 3.59961C7.4626 3.59961 3.6001 7.31211 3.6001 11.8871C3.6001 11.9996 3.6001 20.3996 3.6001 20.3996H12.0376C16.6501 20.3996 20.4001 16.5746 20.4001 11.9996C20.4001 7.46211 16.6501 3.59961 12.0376 3.59961ZM12.0001 16.7996C11.2501 16.7996 10.5751 16.6496 9.9376 16.3496L6.9001 17.0996L7.7626 14.2871C7.3876 13.6121 7.2001 12.8621 7.2001 11.9996C7.2001 9.37461 9.3376 7.19961 12.0001 7.19961C14.6251 7.19961 16.8001 9.37461 16.8001 11.9996C16.8001 14.6621 14.6251 16.7996 12.0001 16.7996Z",
  ],
  github: [
    "M8.8877 17.5439C8.8877 17.6189 8.8127 17.6564 8.7002 17.6564C8.5877 17.6939 8.5127 17.6189 8.5127 17.5439C8.5127 17.4689 8.5877 17.3939 8.7002 17.3939C8.8127 17.3939 8.8877 17.4689 8.8877 17.5439ZM7.7252 17.3564C7.7252 17.4314 7.8002 17.5439 7.9127 17.5439C7.9877 17.5814 8.1002 17.5439 8.1377 17.4689C8.1377 17.3939 8.1002 17.3189 7.9877 17.2814C7.8752 17.2439 7.7627 17.2814 7.7252 17.3564ZM9.4127 17.3189C9.3002 17.3189 9.2252 17.3939 9.2252 17.5064C9.2252 17.5814 9.3377 17.6189 9.4502 17.5814C9.5627 17.5439 9.6377 17.5064 9.6002 17.4314C9.6002 17.3564 9.4877 17.2814 9.4127 17.3189ZM11.8502 2.91895C6.6752 2.91895 2.7002 6.89395 2.7002 12.0689C2.7002 16.2314 5.2877 19.7939 9.0377 21.0689C9.5252 21.1439 9.6752 20.8439 9.6752 20.6189C9.6752 20.3564 9.6752 19.0814 9.6752 18.2939C9.6752 18.2939 7.0502 18.8564 6.4877 17.1689C6.4877 17.1689 6.0752 16.0814 5.4752 15.8189C5.4752 15.8189 4.6127 15.2189 5.5127 15.2189C5.5127 15.2189 6.4502 15.2939 6.9752 16.1939C7.8002 17.6564 9.1502 17.2439 9.7127 16.9814C9.7877 16.3814 10.0127 15.9689 10.3127 15.7064C8.2127 15.4814 6.0752 15.1814 6.0752 11.5814C6.0752 10.5314 6.3752 10.0439 6.9752 9.36895C6.8627 9.10645 6.5627 8.13145 7.0877 6.81895C7.8377 6.59395 9.6752 7.83145 9.6752 7.83145C10.4252 7.60645 11.2127 7.53145 12.0002 7.53145C12.8252 7.53145 13.6127 7.60645 14.3627 7.83145C14.3627 7.83145 16.1627 6.55645 16.9502 6.81895C17.4752 8.13145 17.1377 9.10645 17.0627 9.36895C17.6627 10.0439 18.0377 10.5314 18.0377 11.5814C18.0377 15.1814 15.8252 15.4814 13.7252 15.7064C14.0627 16.0064 14.3627 16.5689 14.3627 17.4689C14.3627 18.7064 14.3252 20.2814 14.3252 20.5814C14.3252 20.8439 14.5127 21.1439 15.0002 21.0314C18.7502 19.7939 21.3002 16.2314 21.3002 12.0689C21.3002 6.89395 17.0627 2.91895 11.8502 2.91895ZM6.3377 15.8564C6.2627 15.8939 6.3002 16.0064 6.3377 16.0814C6.4127 16.1189 6.4877 16.1564 6.5627 16.1189C6.6002 16.0814 6.6002 15.9689 6.5252 15.8939C6.4502 15.8564 6.3752 15.8189 6.3377 15.8564ZM5.9252 15.5564C5.8877 15.6314 5.9252 15.6689 6.0002 15.7064C6.0752 15.7439 6.1502 15.7439 6.1877 15.6689C6.1877 15.6314 6.1502 15.5939 6.0752 15.5564C6.0002 15.5189 5.9627 15.5189 5.9252 15.5564ZM7.1252 16.9064C7.0877 16.9439 7.0877 17.0564 7.2002 17.1314C7.2752 17.2064 7.3877 17.2439 7.4252 17.1689C7.4627 17.1314 7.4627 17.0189 7.3877 16.9439C7.3127 16.8689 7.2002 16.8314 7.1252 16.9064ZM6.7127 16.3439C6.6377 16.3814 6.6377 16.4939 6.7127 16.5689C6.7877 16.6439 6.8627 16.6814 6.9377 16.6439C6.9752 16.6064 6.9752 16.4939 6.9377 16.4189C6.8627 16.3439 6.7877 16.3064 6.7127 16.3439Z",
  ],
  slack: [
    "M9.62546 6.78183C8.58473 6.78183 7.73455 5.93165 7.73455 4.89091C7.73455 3.85018 8.58473 3 9.62546 3C10.6662 3 11.5164 3.85018 11.5164 4.89091V6.78183H9.62546ZM4.89091 16.2652C5.93165 16.2652 6.78183 15.415 6.78183 14.3743V12.4834H4.89091C3.85018 12.4834 3 13.3336 3 14.3743C3 15.415 3.85018 16.2652 4.89091 16.2652ZM9.62546 12.4834C8.58473 12.4834 7.73455 13.3336 7.73455 14.3743V19.1089C7.73455 20.1497 8.58473 20.9998 9.62546 20.9998C10.6662 20.9998 11.5164 20.1497 11.5164 19.1089V14.3743C11.5164 13.3336 10.6662 12.4834 9.62546 12.4834ZM11.5164 9.62492C11.5164 8.58418 10.6663 7.734 9.62552 7.734H4.89091C3.85018 7.734 3 8.58418 3 9.62492C3 10.6656 3.85018 11.5158 4.89091 11.5158H9.62552C10.6663 11.5158 11.5164 10.6656 11.5164 9.62492ZM17.2185 9.62494C17.2185 8.58421 18.0687 7.73403 19.1094 7.73403C20.1502 7.73403 21.0004 8.58421 21.0004 9.62494C21.0004 10.6657 20.1502 11.5159 19.1094 11.5159H17.2185V9.62494ZM14.3748 11.5164C15.4156 11.5164 16.2658 10.6663 16.2658 9.62552V4.89091C16.2658 3.85018 15.4156 3 14.3748 3C13.3341 3 12.4839 3.85018 12.4839 4.89091V9.62552C12.4839 10.6663 13.3341 11.5164 14.3748 11.5164ZM14.3749 17.2185C15.4156 17.2185 16.2658 18.0687 16.2658 19.1094C16.2658 20.1501 15.4156 21.0003 14.3749 21.0003C13.3342 21.0003 12.484 20.1501 12.484 19.1094V17.2185H14.3749ZM12.4839 14.3743C12.4839 15.415 13.3341 16.2652 14.3748 16.2652H19.1095C20.1502 16.2652 21.0004 15.415 21.0004 14.3743C21.0004 13.3336 20.1502 12.4834 19.1095 12.4834H14.3748C13.3341 12.4834 12.4839 13.3336 12.4839 14.3743Z",
  ],
  twitter: [
    "M18.3594 8.73438C18.3594 8.89062 18.3594 9.01562 18.3594 9.17188C18.3594 13.5156 15.0781 18.4844 9.04688 18.4844C7.17188 18.4844 5.45312 17.9531 4.01562 17.0156C4.26562 17.0469 4.51562 17.0781 4.79688 17.0781C6.32812 17.0781 7.73438 16.5469 8.85938 15.6719C7.42188 15.6406 6.20312 14.7031 5.79688 13.3906C6.01562 13.4219 6.20312 13.4531 6.42188 13.4531C6.70312 13.4531 7.01562 13.3906 7.26562 13.3281C5.76562 13.0156 4.64062 11.7031 4.64062 10.1094V10.0781C5.07812 10.3281 5.60938 10.4531 6.14062 10.4844C5.23438 9.89062 4.67188 8.89062 4.67188 7.76562C4.67188 7.14062 4.82812 6.57812 5.10938 6.10938C6.73438 8.07812 9.17188 9.39062 11.8906 9.54688C11.8281 9.29688 11.7969 9.04688 11.7969 8.79688C11.7969 6.98438 13.2656 5.51562 15.0781 5.51562C16.0156 5.51562 16.8594 5.89062 17.4844 6.54688C18.2031 6.39062 18.9219 6.10938 19.5469 5.73438C19.2969 6.51562 18.7969 7.14062 18.1094 7.54688C18.7656 7.48438 19.4219 7.29688 19.9844 7.04688C19.5469 7.70312 18.9844 8.26562 18.3594 8.73438Z",
  ],
  youtube: [
    "M20.1719 7.90625C19.9844 7.15625 19.3906 6.5625 18.6719 6.375C17.3281 6 12.0156 6 12.0156 6C12.0156 6 6.67188 6 5.32812 6.375C4.60938 6.5625 4.01562 7.15625 3.82812 7.90625C3.45312 9.21875 3.45312 12.0312 3.45312 12.0312C3.45312 12.0312 3.45312 14.8125 3.82812 16.1562C4.01562 16.9062 4.60938 17.4688 5.32812 17.6562C6.67188 18 12.0156 18 12.0156 18C12.0156 18 17.3281 18 18.6719 17.6562C19.3906 17.4688 19.9844 16.9062 20.1719 16.1562C20.5469 14.8125 20.5469 12.0312 20.5469 12.0312C20.5469 12.0312 20.5469 9.21875 20.1719 7.90625ZM10.2656 14.5625V9.5L14.7031 12.0312L10.2656 14.5625Z",
  ],
};
