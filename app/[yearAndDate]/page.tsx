"use client"

import { pyq } from '@/pyqjson/pyq'
import renderMathInElement from 'katex/contrib/auto-render'
import { useParams } from 'next/navigation'
import React, { Suspense, useEffect, useRef } from 'react'

const YearAndDateMain = () => {
  const { yearAndDate } = useParams<{ yearAndDate: string }>()
  const dateKey = yearAndDate.replaceAll('-', '')

  if (!/^\d{8}$/.test(dateKey)) {
    return <ErrorComponent message="Invalid date input!" />
  }

  const year = dateKey.slice(0, 4)
  const yearData = Object.entries(pyq).find(([key]) => key === year)?.[1]

  if (!yearData) {
    return <ErrorComponent message="This year's PYQ is not available yet!" />
  }

  const paper = Object.entries(yearData).find(([key]) => key === dateKey)?.[1]

  if (!paper) {
    return <ErrorComponent message="PYQ for this date is not available!" />
  }

  return (
  <main className="w-full space-y-8 px-2 py-6">
    {paper.data.sections.map((section) => (
        <section key={section.id} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p>
              {section.questions.length} questions · {section.maxMarks} marks
            </p>
          </div>
          <ol className="space-y-6">
            {section.questions.map((question, index) => {
              const localizedQuestion =
                question.question[paper.data.defaultLanguage === 'hi' ? 'hi' : 'en']

              return (
                <li
                  key={question.question_id ?? index}
                  className="space-y-3"
                >
                  <p className="font-medium">{index + 1}.</p>
                  {localizedQuestion.comprehension && (
                    <FormattedHtml html={localizedQuestion.comprehension} />
                  )}
                  {localizedQuestion.direction && (
                    <FormattedHtml html={localizedQuestion.direction} />
                  )}
                  <FormattedHtml
                    html={localizedQuestion.content}
                    className="question-content"
                  />
                  <ol className="space-y-2">
                    {localizedQuestion.options.map((option) => (
                      <li
                        key={option.identifier}
                        className="flex gap-2"
                      >
                        <span className="font-semibold">{option.identifier}.</span>
                        <FormattedHtml html={option.content} />
                      </li>
                    ))}
                  </ol>
                </li>
              )
            })}
          </ol>
        </section>
      ))}
    </main>
  )
}

const FormattedHtml = ({
  html,
  className,
}: {
  html: string
  className?: string
}) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    renderMathInElement(contentRef.current, {
      delimiters: [
        { left: '$$', right: '$$', display: false },
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false },
      ],
      throwOnError: false,
      ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
    })
  }, [html])

  return (
    <div
      ref={contentRef}
      className={`min-w-0 overflow-x-auto ${className ?? ''}`}
      dangerouslySetInnerHTML={{
        __html: html.replace(/_\\limits/g, '\\limits_'),
      }}
    />
  )
}

const ErrorComponent = ({ message }: { message: string }) => (
  <div className="flex h-screen w-full items-center justify-center">
    <span className="text-xl uppercase">{message}</span>
  </div>
)

const YearAndDateWrapper = () => (
  <Suspense>
    <YearAndDateMain />
  </Suspense>
)

export default YearAndDateWrapper
