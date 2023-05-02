import openai

openai.api_key = "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"

response = openai.Completion.create(
    model = "text-davinci-003",
    prompt = "Can you explain John Wick in 5 words?",
    temperature = 0,
    max_tokens = 50
)

print(response.choices[0].text.strip())
