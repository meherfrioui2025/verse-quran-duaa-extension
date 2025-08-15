import { FC, useState } from "react";

import { useExtensionTranslation } from "../../hooks/useExtensionTranslation";
import { NotificationSettings, PrayerSettings, Settings } from "../../types";
import Button from "../ui/button";

interface SettingsTabProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

const SettingsTab: FC<SettingsTabProps> = ({ settings, onSettingsChange }) => {
  const { t } = useExtensionTranslation();

  const [activeSection, setActiveSection] = useState<
    "notifications" | "prayers"
  >("notifications");

  const sections = [
    { id: "notifications", label: "settings.notifications", icon: "mdi-bell" },
    { id: "prayers", label: "settings.prayers", icon: "mdi-clock" },
  ] as const;

  const updateNotificationSetting = <K extends keyof NotificationSettings>(
    key: K,
    value: NotificationSettings[K]
  ) => {
    onSettingsChange({
      ...settings,
      notificationSettings: {
        ...settings.notificationSettings,
        [key]: value,
      },
    });
  };

  const updatePrayerSetting = <K extends keyof PrayerSettings>(
    key: K,
    value: PrayerSettings[K]
  ) => {
    onSettingsChange({
      ...settings,
      prayerSettings: {
        ...settings.prayerSettings,
        [key]: value,
      },
    });
  };

  const timeOptions = [5, 10, 20, 50, 60, 300, 600, 1800];
  const timeOptionsInterval = [5, 10, 30, 60, 300, 600, 1800];
  const contentTypes = ["both", "duas", "quran"];
  const calculationMethods = [
    { value: "MWL", label: "Muslim World League" },
    { value: "ISNA", label: "Islamic Society of North America" },
    { value: "Egypt", label: "Egyptian General Authority" },
    { value: "Makkah", label: "Umm Al-Qura (Makkah)" },
    { value: "Karachi", label: "University of Islamic Sciences, Karachi" },
  ];

  const alertOptions = [
    { value: 5, label: "5 minutes" },
    { value: 10, label: "10 minutes" },
    { value: 15, label: "15 minutes" },
    { value: 20, label: "20 minutes" },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50 mb-2">
      <div className="bg-white p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          {t("settings.settings")}
        </h2>
        <p className="text-sm text-gray-600">
          {t("settings.customizeExperience")}
        </p>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="flex gap-2">
          {sections.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <Button
                key={section.id}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white border-b-2 border-[var(--islamic-green)] bg-[var(--islamic-green)] bg-opacity-5"
                    : "text-gray-500 hover:text-[var(--islamic-green)]"
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className={`text-md mx-2 mdi ${section.icon}`} />
                <span className="text-sm">{t(section.label)}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeSection === "notifications" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-1 mb-3">
                <span className="mdi mdi-bell  text-[var(--islamic-green)]" />
                <h3 className="font-semibold text-gray-800">
                  {t("settings.notificationSettings")}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-800">
                      {t("settings.enableNotifications")}
                    </span>
                    <p className="text-xs text-gray-500">
                      {t("settings.receiveDailyReminders")}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.notificationSettings.enabled}
                      onChange={(e) =>
                        updateNotificationSetting("enabled", e.target.checked)
                      }
                      data-testid="toggle-notifications"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--islamic-green)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--islamic-green)]"></div>
                  </label>
                </div>

                {settings.notificationSettings.enabled && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">
                          {t("settings.startTime")}
                        </label>
                        <input
                          type="time"
                          className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--islamic-green)] focus:border-transparent"
                          value={settings.notificationSettings.startTime}
                          onChange={(e) =>
                            updateNotificationSetting(
                              "startTime",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">
                          {t("settings.endTime")}
                        </label>
                        <input
                          type="time"
                          className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--islamic-green)] focus:border-transparent"
                          value={settings.notificationSettings.endTime}
                          onChange={(e) =>
                            updateNotificationSetting("endTime", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium text-gray-800">
                          {t("settings.notificationDuration")}
                        </span>
                        <p className="text-xs text-gray-500">
                          {t("settings.reminderFrequency")}
                        </p>
                      </div>
                      <select
                        className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--islamic-green )]focus:border-transparent bg-white shadow-sm"
                        value={settings.notificationSettings.displayDuration}
                        onChange={(e) =>
                          updateNotificationSetting(
                            "displayDuration",
                            parseInt(e.target.value)
                          )
                        }
                      >
                        {timeOptions.map((item) => (
                          <option key={item} value={item}>
                            {t(`settings.timeOptions.${item}`)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium text-gray-800">
                          {t("settings.notificationInterval")}
                        </span>
                        <p className="text-xs text-gray-500">
                          {t("settings.reminderFrequencyInterval")}
                        </p>
                      </div>
                      <select
                        className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--islamic-green)] focus:border-transparent bg-white shadow-sm"
                        value={settings.notificationSettings.interval}
                        onChange={(e) =>
                          updateNotificationSetting(
                            "interval",
                            parseInt(e.target.value, 10)
                          )
                        }
                      >
                        {timeOptionsInterval.map((item) => (
                          <option key={item} value={item}>
                            {t(`settings.timeOptionsInterval.${item}`)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium text-gray-800">
                          {t("settings.contentType")}
                        </span>
                        <p className="text-xs text-gray-500">
                          {t("settings.contentTypeDescription")}
                        </p>
                      </div>
                      <select
                        className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--islamic-green)] focus:border-transparent bg-white shadow-sm"
                        value={settings.notificationSettings.contentType}
                        onChange={(e) =>
                          updateNotificationSetting(
                            "contentType",
                            e.target.value as "both" | "quran" | "duas"
                          )
                        }
                      >
                        {contentTypes.map((content) => (
                          <option key={content} value={content}>
                            {t(`settings.contentOptions.${content}`)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {activeSection === "prayers" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <span className="mdi mdi-clock w-5 h-5 text-[var(--islamic-green)]" />
                <h3 className="font-semibold text-gray-800">
                  {t("settings.prayerTimeSettings")}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-800">
                      {t("settings.calculationMethod")}
                    </span>
                    <p className="text-xs text-gray-500">
                      {t("settings.calculationMethodDescription")}
                    </p>
                  </div>
                  <select
                    className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--islamic-green )]focus:border-transparent bg-white shadow-sm"
                    value={settings.prayerSettings.calculationMethod}
                    onChange={(e) =>
                      updatePrayerSetting(
                        "calculationMethod",
                        e.target.value as any
                      )
                    }
                  >
                    {calculationMethods.map((place) => (
                      <option key={place.value} value={place.value}>
                        {t(`settings.calculationMethods.${place.value}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-800">
                      {t(`settings.prayerAlerts`)}
                    </span>
                    <p className="text-xs text-gray-500">
                      {t("settings.notifyBeforePrayer")}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.prayerSettings.alerts}
                      onChange={(e) =>
                        updatePrayerSetting("alerts", e.target.checked)
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--islamic-green)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--islamic-green)]"></div>
                  </label>
                </div>

                {settings.prayerSettings.alerts && (
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium text-gray-800">
                        {t("settings.alertTime")}
                      </span>
                      <p className="text-xs text-gray-500">
                        {t("settings.minutesBeforePrayer")}
                      </p>
                    </div>
                    <select
                      className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--islamic-green)] focus:border-transparent bg-white shadow-sm"
                      value={settings.prayerSettings.alertMinutes}
                      onChange={(e) =>
                        updatePrayerSetting(
                          "alertMinutes",
                          parseInt(e.target.value)
                        )
                      }
                    >
                      {alertOptions.map((minute) => (
                        <option key={minute.value} value={minute.value}>
                          {t(`settings.alertOptions.${minute.value}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsTab;
