import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf8');
const badBlock = `                                {session && (
                             <div className={\`h-full w-full border-l-2 md:border-l-                            {session && (
                               <div className={\`h-full w-full border-l-2 md:border-l-4 p-1 md:p-2 flex flex-col justify-center transition-colors shadow-lg cursor-pointer overflow-hidden \${
                                 session.type === 'fundamentals' ? 'bg-surface-variant border-primary-container hover:bg-surface-bright' :
                                 session.type === 'advanced' ? 'bg-primary-container border-white hover:brightness-110' :
                                 'bg-secondary-container border-on-secondary-container hover:brightness-110'
                               }\`}>
                                 <span className={\`text-[7px] md:text-[8px] font-black uppercase leading-none block mb-0.5 \${session.type === 'advanced' ? 'text-white/80' : 'text-primary'}\`}>{session.title}</span>
                                 <span className={\`text-[9px] md:text-[10px] font-black leading-tight block mb-0.5 \${session.type === 'advanced' ? 'text-white' : 'text-on-surface'}\`}>{selectedProgram?.name || 'ТРЕНИРОВКА'}</span>
                                 <span className={\`text-[7px] md:text-[8px] italic leading-none block \${session.type === 'advanced' ? 'text-white/70' : 'text-on-surface-variant'}\`}>{session.coach}</span>
                               </div>
                             )}-full max-h-[90vh]">`;

// Use a regex that ignores indentation and whitespace variation
const regex = /\{\s*session\s*&&\s*\(\s*<div\s*className=\{\`h-full\s*w-full\s*border-l-2\s*md:border-l-\s*\{\s*session\s*&&\s*\(\s*<div\s*className=\{\`h-full\s*w-full\s*border-l-2\s*md:border-l-4\s*p-1\s*md:p-2\s*flex\s*flex-col\s*justify-center\s*transition-colors\s*shadow-lg\s*cursor-pointer\s*overflow-hidden\s*\${[^}]+\}\`\}>\s*<span\s*className=\{\`text-\[7px\]\s*md:text-\[8px\]\s*font-black\s*uppercase\s*leading-none\s*block\s*mb-0\.5\s*\${[^}]+\}\`\}>\{session\.title\}<\/span>\s*<span\s*className=\{\`text-\[9px\]\s*md:text-\[10px\]\s*font-black\s*leading-tight\s*block\s*mb-0\.5\s*\${[^}]+\}\`\}>\{selectedProgram\?\.name\s*\|\|\s*'ТРЕНИРОВКА'\}<\/span>\s*<span\s*className=\{\`text-\[7px\]\s*md:text-\[8px\]\s*italic\s*leading-none\s*block\s*\${[^}]+\}\`\}>\{session\.coach\}<\/span>\s*<\/div>\s*\)\}-full max-h-\[90vh\]">/;

const newBlock = `                      </div>
                      <div>
                        <h4 className="font-display font-bold text-on-surface uppercase text-sm mb-4 tracking-widest font-black italic">Специализация</h4>
                        <ul className="space-y-2">
                          {selectedCoach.specialization.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <Target size={16} className="text-primary-container shrink-0 mt-0.5" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 relative z-10">
                  <button onClick={() => setActiveModal('registration')} className="btn-primary w-full flex items-center justify-center gap-4">
                    Записаться на тренировку
                    <ArrowRight />
                    <ArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={activeModal === 'schedule'} onClose={() => setActiveModal('none')}>
        <div className="flex flex-col h-full max-h-[90vh]">`;

const updatedContent = content.replace(regex, newBlock);
fs.writeFileSync('src/App.tsx', updatedContent);
console.log('Update complete');
