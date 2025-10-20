import React from 'react';

export default function AuditLogsTable() {

  const auditLogs = [
    {
      id: 1,
      username: 'mz_n',
      userId: '618078478755037185',
      avatar: 'https://cdn.discordapp.com/embed/avatars/1.png ',
      date: '2025-01-20 14:32',
      action: 'Updated server settings'
    },
    {
      id: 2,
      username: 'AlexGamer',
      userId: '123456789012345678',
      avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
      date: '2025-01-20 13:15',
      action: 'Created new reaction role'
    },
    {
      id: 3,
      username: 'SarahMod',
      userId: '987654321098765432',
      avatar: 'https://cdn.discordapp.com/embed/avatars/1.png',
      date: '2025-01-20 12:48',
      action: 'Banned user @spammer123'
    },
    {
      id: 4,
      username: 'JohnAdmin',
      userId: '456789123456789123',
      avatar: 'https://cdn.discordapp.com/embed/avatars/2.png',
      date: '2025-01-20 11:22',
      action: 'Modified welcome message'
    },
    {
      id: 5,
      username: 'EmilyHelper',
      userId: '789123456789123456',
      avatar: 'https://cdn.discordapp.com/embed/avatars/3.png',
      date: '2025-01-20 10:05',
      action: 'Added auto role for new members'
    }
  ];

  return (
    <div className="w-full rounded-2xl bg-[#191822]/50 border mb-[2rem] border-[#2e2b41] overflow-hidden">
     
      <div className="px-4 sm:px-6 py-4 border-b border-[#2e2b41]">
        <h2 className="text-lg sm:text-xl font-bold text-white">Recent Activity</h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Latest 5 actions in your server</p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-[#2e2b41]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2b3d] cursor-pointer">
            {auditLogs.map((log) => (
              <tr 
                key={log.id}
                className="transition-colors duration-200 group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={log.avatar}
                        alt={log.username}
                        className="w-10 h-10 rounded-full bg-indigo-700 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors duration-200">
                        {log.username}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">
                        {log.userId}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="w-4 h-4 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span className="text-sm text-gray-300">{log.date}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                      {log.action}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-[#2d2b3d]">
        {auditLogs.map((log) => (
          <div 
            key={log.id}
            className="p-4 hover:bg-[#1f1d2e] transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-start gap-3 mb-3">
              <img
                src={log.avatar}
                alt={log.username}
                className="w-12 h-12 rounded-full bg-indigo-700 flex-shrink-0"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-semibold text-white truncate">
                  {log.username}
                </span>
                <span className="text-xs text-gray-500 font-mono truncate">
                  {log.userId}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>{log.date}</span>
            </div>
            <p className="text-sm text-gray-300 break-words">
              {log.action}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 py-4 border-t bg-[#191822] border-[#2e2b41] flex items-center justify-center">
        <span className="text-xs sm:text-sm text-gray-400">
          Powered by Muzzle 
        </span>
      </div>
    </div>
  );
}