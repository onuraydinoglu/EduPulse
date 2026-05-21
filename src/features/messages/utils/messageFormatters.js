export const getMessageValue = (
    message,
    camelKey,
    pascalKey,
    fallback = "",
  ) => {
    return message?.[camelKey] ?? message?.[pascalKey] ?? fallback;
  };
  
  export const getMessageId = (message) => {
    return getMessageValue(message, "id", "Id");
  };
  
  export const getMessageTitle = (message) => {
    return getMessageValue(message, "title", "Title", "Başlıksız");
  };
  
  export const getMessageContent = (message) => {
    return getMessageValue(message, "content", "Content");
  };
  
  export const getMessageSenderFullName = (message) => {
    return getMessageValue(message, "senderFullName", "SenderFullName");
  };
  
  export const getMessageReceiverFullName = (message) => {
    return getMessageValue(
      message,
      "receiverFullName",
      "ReceiverFullName",
    );
  };
  
  export const getMessageReceiverGroupName = (message) => {
    return getMessageValue(
      message,
      "receiverGroupName",
      "ReceiverGroupName",
    );
  };
  
  export const getMessageDisplayReceiverName = (message) => {
    return (
      getMessageReceiverGroupName(message) ||
      getMessageReceiverFullName(message)
    );
  };
  
  export const getMessageCreatedDate = (message) => {
    return getMessageValue(message, "createdDate", "CreatedDate");
  };
  
  export const getMessageIsRead = (message) => {
    return getMessageValue(message, "isRead", "IsRead", true);
  };
  
  export const formatMessageDate = (date) => {
    if (!date) return "";
  
    return new Date(date).toLocaleDateString("tr-TR");
  };
  
  export const formatMessageDateTime = (date) => {
    if (!date) return "";
  
    return new Date(date).toLocaleString("tr-TR");
  };
  
  export const getUserId = (user) => {
    return user.userId || user.UserId;
  };
  
  export const getUserFullName = (user) => {
    return user.fullName || user.FullName;
  };
  
  export const getUserRoleName = (user) => {
    return user.roleName || user.RoleName;
  };