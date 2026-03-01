#!/usr/bin/env bash

#!/usr/bin/env bash

set -e

echo "installing node dependancies"
npm install

echo "Starting Supabase..."

#if supbase is already running, this will do nothing
npx supabase start

echo "Fetching Supabase status..."
STATUS=$(npx supabase status)

# Extract values by splitting on the box character │
API_URL=$(echo "$STATUS" | grep "Project URL" | cut -d '│' -f3 | xargs)
ANON_KEY=$(echo "$STATUS" | grep "Publishable" | cut -d '│' -f3 | xargs)

if [ -z "$API_URL" ] || [ -z "$ANON_KEY" ]; then
  echo "Failed to retrieve Supabase credentials."
  echo "Full status output:"
  echo "$STATUS"
  exit 1
fi

echo "Creating .env file..."

cat > .env.local <<EOF
NEXT_PUBLIC_SUPABASE_URL=$API_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY
EOF

echo ".env created successfully!"
echo "URL: $API_URL"

echo "running db migrations" 
npx supabase db reset


echo "All done! You can now run 'npm run dev' to start the development server."