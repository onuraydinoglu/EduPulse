import { MESSAGE_TABS } from "../constants/messageConstants";

function MessageTabs({ activeTab, setActiveTab, unreadCount }) {
    return (
        <div className="mb-5 inline-flex rounded-2xl bg-base-200 p-1">
            <button
                type="button"
                onClick={() => setActiveTab(MESSAGE_TABS.INBOX)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${activeTab === MESSAGE_TABS.INBOX
                    ? "bg-base-100 text-base-content shadow-sm"
                    : "text-base-content/60 hover:text-base-content"
                    }`}
            >
                Gelen Kutusu
                {unreadCount > 0 && (
                    <span className="ml-2 rounded-full bg-error px-2 py-0.5 text-xs text-error-content">
                        {unreadCount}
                    </span>
                )}
            </button>

            <button
                type="button"
                onClick={() => setActiveTab(MESSAGE_TABS.SENT)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${activeTab === MESSAGE_TABS.SENT
                    ? "bg-base-100 text-base-content shadow-sm"
                    : "text-base-content/60 hover:text-base-content"
                    }`}
            >
                Gönderilenler
            </button>
        </div>
    );
}

export default MessageTabs;